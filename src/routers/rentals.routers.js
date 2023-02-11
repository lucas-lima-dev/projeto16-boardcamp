import { Router } from "express";
import { addRentals, deleteRentals, searchRentals } from "../controllers/rentals.controllers";
import { addRentalsValidation } from "../middlewares/rentals.middleware";

const rentalsRouter = Router();

rentalsRouter.get("/rentals",searchRentals)
rentalsRouter.post("/rentals",addRentalsValidation,addRentals)
rentalsRouter.post("/rentals/:id/return",)
rentalsRouter.delete("/rentals/:id",deleteRentals)

export default rentalsRouter;