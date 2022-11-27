import express from "express"
import { AccountingEntryApi } from "../controllers/AccountingEntryController.js"

const router = express.Router()

//  AccountingEntry Creation routes
router.post("/", AccountingEntryApi)

export { router as AccountingEntriesRoutes}