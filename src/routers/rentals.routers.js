import { Router } from "express";
import { addRentals, deleteRentals, searchRentals } from "../controllers/rentals.controllers.js";
import { addRentalsValidation } from "../middlewares/rentals.middleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals",searchRentals)
rentalsRouter.post("/rentals",addRentalsValidation,addRentals)
rentalsRouter.post("/rentals/:id/return",)
rentalsRouter.delete("/rentals/:id",deleteRentals)

export default rentalsRouter;