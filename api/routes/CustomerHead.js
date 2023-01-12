import express from "express"
import { allCustomerHeadData, allCustomerName, customerData, CustomerHeadApi, DeleteCustomerData, UpdateCustomerData } from "../controllers/CustomerHeadController.js"

const router = express.Router()

//  customerHead Creation routes
router.post("/", CustomerHeadApi)


//  customerHead  Names
router.get("/", allCustomerName)

// get Single customerHead Data
router.post("/data", customerData )

// get customerHead Data
router.get("/all", allCustomerHeadData )

// Update customerHead Data
router.patch("/:id", UpdateCustomerData )

// Delete customerHead Data
router.delete("/:id", DeleteCustomerData )


export { router as customerHeadRoute}