import { Router } from "express";
import { searchGames,addGames } from "../controllers/games.controllers.js";

const gamesRouter = Router();

gamesRouter.get("/games",searchGames);
gamesRouter.post("/games",addGames)

export default gamesRouter