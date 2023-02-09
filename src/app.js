import express,{json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import gamesRouter from "./routers/games.routers.js";
import customersRouter from "./routers/customers.routers.js";
import rentalsRouter from "./routers/rentals.routers.js";


dotenv.config();

const server = express();
server.use([cors(),json(),gamesRouter,customersRouter,rentalsRouter]);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running in port: ${port}`));