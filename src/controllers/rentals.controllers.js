import { db } from "../database/database.connection.js";

export async function searchRentals(req, res) {
  try {
    const rentals = await db.query(`
    SELECT 
     rentals.*,
     json_build_object('id',customers.id,'name',customers.name) AS customer,
     json_build_object('id',games.id,'name',games.name) AS game
    FROM 
     rentals
     JOIN customers
      ON rentals."customerId" = customers.id
     JOIN games
      ON rentals."gameId" = games.id;`);
    res.send(rentals.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addRentals(req, res) {
  const {
    customerId,
    gameId,
    daysRented,
    rentDate,
    returnDate,
    originalPrice,
    delayFee,
  } = res.locals.newRentals;

  try {
    await db.query(
      `
        INSERT INTO rentals (
          "customerId",
          "gameId",
          "rentDate",
          "daysRented",
          "returnDate",
          "originalPrice",
          "delayFee"
        ) 
        VALUES ($1,$2,$3,$4,$5,$6,$7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee
      ]
    );

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function finishRentals(req, res) {
  const { 
    customerId,
    gameId, 
    daysRented,
    rentDate,
    returnDate,
    originalPrice,
    delayFee,
    id 
  } = res.locals.finishRentals;

  try {
    await db.query(
      `UPDATE rentals
        SET
         "customerId" = $1,
         "gameId" = $2,
         "daysRented" = $3,
         "rentDate" = $4,
         "returnDate" = $5,
         "originalPrice" = $6,
         "delayFee" = $7
        WHERE "id" = $8;`,
         [customerId,
          gameId,
          daysRented, 
          rentDate, 
          returnDate, 
          originalPrice,
          delayFee,
          id]
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteRentals(req, res) {
  const { id } = res.locals.id;

  try {
    await db.query(
      `
            DELETE FROM rentals  
            WHERE id=$1;`,
      [id]
    );

    res.status(200).send("Rental delete sucessfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}
