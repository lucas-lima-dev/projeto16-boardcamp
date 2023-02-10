import { addGamesSchema } from "../schemas/games.schema.js";
import { db } from "../database/database.connection.js";

export async function addGamesValidation(req, res, next) {
  const { name, image, stockTotal, pricePerDay } = req.body;

  if (!name || !image || !stockTotal || !pricePerDay)
    return res
      .status(400)
      .send("All fields (name, image, stockTotal, pricePerDay) are required");

   const {error} = addGamesSchema.validate(
    { name, image, stockTotal, pricePerDay },
    { abortEarly: false }) 

    if (error) {
        const errorsMessage = error.details.map((detail) => detail.message);
        return res.status(400).send(errorsMessage);
      }

    const checkName = await db.query(`SELECT * games WHERE name=$1)`,[name])

    if(checkName.rowCount !== 0) return res.status(409).send("Name already exists")

    res.locals.newGame = { name, image, stockTotal, pricePerDay }

    next()
}
