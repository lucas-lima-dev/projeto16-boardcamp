import joi from "joi";

export const addGamesSchema = joi.object({
    name:joi.string().min(1).required(), 
    image:joi.string().min(1).required(), 
    stockTotal:joi.number().positive().integer().required(), 
    pricePerDay:joi.number().positive().required()
})