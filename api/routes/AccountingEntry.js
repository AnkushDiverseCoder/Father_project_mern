import express from "express"
import { AccountingEntryApi, getEmail } from "../controllers/AccountingEntryController.js"

const router = express.Router()

//  AccountingEntry Creation routes
router.post("/", AccountingEntryApi)
// getEmail
router.post("/getEmail", getEmail)

export { router as AccountingEntriesRoutes}