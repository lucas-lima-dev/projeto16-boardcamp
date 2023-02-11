import { Router } from "express";
import { addRentals, deleteRentals, finishRentals, searchRentals } from "../controllers/rentals.controllers.js";
import { addRentalsValidation, deleteRentalsValidation, finishRentalsValidation } from "../middlewares/rentals.middleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals",searchRentals)
rentalsRouter.post("/rentals",addRentalsValidation,addRentals)
rentalsRouter.post("/rentals/:id/return",finishRentalsValidation,finishRentals)
rentalsRouter.delete("/rentals/:id",deleteRentalsValidation,deleteRentals)

export default rentalsRouter;