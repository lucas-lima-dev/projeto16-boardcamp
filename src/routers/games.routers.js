import { Router } from "express";
import { searchGames,addGames } from "../controllers/games.controllers.js";
import { addGamesValidation } from "../middlewares/games.middleware.js";

const gamesRouter = Router();

gamesRouter.get("/games",searchGames);
gamesRouter.post("/games",addGamesValidation,addGames)

export default gamesRouter