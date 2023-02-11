import { db } from "../database/database.connection.js";
import { addRentalsSchema } from "../schemas/rentals.schema.js";

export async function addRentalsValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

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

  const checkCustomer = await db.query(`SELECT * FROM customers WHERE id=$1)`, [
    customerId,
  ]);

  if (checkCustomer.rowCount == 0)
    return res.status(400).send("Customer not found");

  const checkGame = await db.query(`SELECT * FROM games WHERE id=$1)`, [
    gameId,
  ]);

  if (checkGame.rowCount == 0) return res.status(400).send("Game not found");

  const pricePerDay = await db.query(
    `SELECT pricePerDay FROM games WHERE id = $1`,
    [gameId]
  );

  const rentDate = Date.now();
  const returnDate = null;
  const originalPrice = daysRented * pricePerDay;
  const delayFee = null;

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
