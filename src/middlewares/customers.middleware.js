import { db } from "../database/database.connection.js";
import { addCustomersSchema } from "../schemas/customers.schema.js";


export async function addCustomersValidation(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;
  
    if (!name || !phone || !cpf || !birthday)
      return res
        .status(400)
        .send("All fields (name, phone, cpf, birthday) are required");
  
     const {error} = addCustomersSchema.validate(
      { name, phone, cpf, birthday },
      { abortEarly: false }) 
  
      if (error) {
          const errorsMessage = error.details.map((detail) => detail.message);
          return res.status(400).send(errorsMessage);
        }
  
      const checkCPF = await db.query(`SELECT * FROM customers WHERE cpf=$1;`,[cpf])
  
      if(checkCPF.rowCount !== 0) return res.status(409).send("CPF already exists")
  
      res.locals.newCustomer = { name, phone, cpf, birthday }
  
      next()
  }

export async function updateCustomersValidation(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;
    const {id} = req.params
  
    if (!name || !phone || !cpf || !birthday)
      return res
        .status(400)
        .send("All fields (name, phone, cpf, birthday) are required");

     const checkID = await db.query(`SELECT * FROM customers WHERE id=$1;`,[id])

     if(checkID.rowCount === 0) return res.status(404).send("Id number not found")
  
     const {error} = addCustomersSchema.validate(
      { name, phone, cpf, birthday },
      { abortEarly: false }) 
  
      if (error) {
          const errorsMessage = error.details.map((detail) => detail.message);
          return res.status(400).send(errorsMessage);
        }
  
      const checkCPF = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND id <> $2;`,[cpf,id])
  
      if(checkCPF.rowCount !== 0) return res.status(409).send("CPF already exists")
  
      res.locals.newCustomer = { name, phone, cpf, birthday,id }
  
      next()
  }