import { Router } from "express";
import { 
    searchCustomers,
    addCustomers,
    updateCustomers 
} from "../controllers/customers.controllers.js";
import { addCustomersValidation, updateCustomersValidation } from "../middlewares/customers.middleware.js";

const customersRouter = Router();

customersRouter.get("/customers",searchCustomers)
customersRouter.post("/customers",addCustomersValidation,addCustomers)
customersRouter.put("/customers/:id",updateCustomersValidation,updateCustomers)

export default customersRouter;