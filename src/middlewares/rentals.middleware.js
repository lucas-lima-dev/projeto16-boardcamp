import { db } from "../database/database.connection.js";
import { addRentalsSchema } from "../schemas/rentals.schema.js";
import dayjs from "dayjs";

export async function addRentalsValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format('YYYY-MM-DD');
  const returnDate = null;
  const delayFee = null;

  if (!customerId || !gameId || !daysRented)
    return res
      .status(400)
      .send("All fields (customerId, gameId, daysRented) are required");

  const { error } = addRentalsSchema.validate(
    { customerId, gameId, daysRented },
    { abortEarly: false }
  );

  if (error) {
    const errorsMessage = error.details.map((detail) => detail.message);
    return res.status(400).send(errorsMessage);
  }

  const checkCustomer = await db.query(`SELECT * FROM customers WHERE id=$1;`, 
  [customerId]
  );

  if (checkCustomer.rowCount == 0)
    return res.status(400).send("Customer not found");

  const checkGame = await db.query(`SELECT * FROM games WHERE id=$1;`, [
    gameId
  ]);

  if (! checkGame) return res.status(400).send("Game not fount");

  const game = await db.query(
    `SELECT * FROM games WHERE id = $1`,
    [gameId]
  );
  
  const {pricePerDay} = game.rows[0]
  
  let originalPrice = daysRented * pricePerDay;

  const isGameAvailable = await db.query(`SELECT * FROM rentals WHERE "gameId"= $1 AND "returnDate" IS NULL;`,[gameId])

  const gameStockSize = checkGame.rows[0].stockTotal
  const gameRentedNumber = isGameAvailable.rows.length

  const GameIsNotInStock = (gameStockSize <= gameRentedNumber)

  if(GameIsNotInStock) return res.status(400).send("Game not in stock!")

  res.locals.newRentals = {
    customerId,
    gameId,
    daysRented,
    rentDate,
    returnDate,
    originalPrice,
    delayFee,
  };

  next();
}


export async function deleteRentalsValidation(req, res, next) {
  const { id } = req.params;

  const rentalExists = await db.query(`SELECT * FROM rentals WHERE id=$1;`,[id])

  if(rentalExists.rowCount === 0) return res.status(404).send("Id number not found")

  const rental = rentalExists.rows[0]

  const isRentalReturned = rental.returnDate

  if(!isRentalReturned) return res.status(400).send("This rental was not returned yet")

  res.locals.id = id

  next()
}