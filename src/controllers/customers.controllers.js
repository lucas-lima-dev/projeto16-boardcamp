import { db } from "../database/database.connection.js";

export async function searchCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");
    res.send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function searchCustomersById(req, res) {
  const { id } = req.params;

  try {
    const customers = await db.query(
      `
        SELECT * FROM customers
        WHERE customers.id = $1`,
      [id]
    );
    res.send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    await db.query(
      `
        INSERT INTO customers (name, phone,cpf,birthday) 
        VALUES ($1,$2,$3,$4)`,
      [name, phone, cpf, birthday]
    );

    res.status(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function updateCustomers(req, res) {
  const { name, phone, cpf, birthday, id } = req.body;

  try {
    await db.query(
      `
          UPDATE customers 
          SET name=$1, phone=$2,cpf=$3,birthday=$4 
          WHERE id=$5`,
      [name, phone, cpf, birthday, id]
    );

    res.status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
