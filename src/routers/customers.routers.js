import { Router } from "express";
import { 
    searchCustomers,
    addCustomers,
    updateCustomers 
} from "../controllers/customers.controllers.js";

const customersRouter = Router();

customersRouter.get("/customers",searchCustomers)
customersRouter.post("/customers",addCustomers)
customersRouter.put("/customers",updateCustomers)

export default customersRouter;