import express from "express"
import { allCustomerName, CustomerHeadApi } from "../controllers/CustomerHeadController.js"

const router = express.Router()

//  customerHead Creation routes
router.post("/", CustomerHeadApi)
//  customerHead Creation routes
router.get("/", allCustomerName)

export { router as customerHeadRoute}