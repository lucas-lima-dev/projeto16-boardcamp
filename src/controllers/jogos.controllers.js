import { db } from "../database/database.connection";

export async function searchGames(req,res) {
    try {
        const games = await db.query("SELECT * FROM games")
        res.send(games)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function addGames(req,res) {

    const {name,image,stockTotal,pricePerDay} = req.body

    try {
        await db.query(`
        INSERT INTO games (name, image,stockTotal,pricePerDay) 
        VALUES ($1,$2,$3,$4)`,
        [name,image,stockTotal,pricePerDay])

        res.status(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}