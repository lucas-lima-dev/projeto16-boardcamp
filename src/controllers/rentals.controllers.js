import { db } from "../database/database.connection.js";

export async function searchRentals(req, res) {
  try {
    const rentals = await db.query("SELECT * FROM rentals");
    res.send(rentals);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function searchRentalsById(req, res) {
  const { id } = req.params;

  try {
    const rentals = await db.query(
      `
        SELECT * FROM rentals
        WHERE rentals.id = $1`,
      [id]
    );
    res.send(rentals);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addRentals(req, res) {
  const { customerId,gameId,daysRented} = req.body;
  const rentDate = Date.now()
  const returnDate = null
  const originalPrice = 4500;
  const delayFee = null;

  try {
    await db.query(
      `
        INSERT INTO rentals (customerId, gameId,rentDate,daysRented,returnDate,originalPrice,delayFee) 
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [customerId, gameId, rentDate, daysRented,returnDate,originalPrice,delayFee]
    );

    res.status(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateRentals(req, res) {
  const { name, phone, cpf, birthday, id } = req.body;

  try {
    await db.query(
      `
          UPDATE rentals 
          SET name=$1, phone=$2,cpf=$3,birthday=$4 
          WHERE id=$5`,
      [name, phone, cpf, birthday, id]
    );

    res.status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteRentals(req, res) {
    const { id } = req.params;
  
    try {
      await db.query(
        `
            DELETE FROM rentals  
            WHERE id=$1`,
        [id]
      );
  
      res.status(200).send("sem dados");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
