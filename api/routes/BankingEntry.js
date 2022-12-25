import express from "express"
import { BankingEntryApi } from "../controllers/BankingEntryController.js"

const router = express.Router()

//  Banking Entry Creation routes
router.post("/", BankingEntryApi)

export {router as BankingEntryRouter}