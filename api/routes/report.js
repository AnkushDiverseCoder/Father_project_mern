import express from "express"
import { BankingReportController, CustomerReportController, IndividualReportController, bankRemoveEntry, monthlyReportController, removeEntry } from "../controllers/reportController.js"

const router = express.Router()

// get all the data of that date 
router.post("/dailyReport", CustomerReportController)
router.post("/monthlyReport", monthlyReportController)
router.post("/individualReport", IndividualReportController)
router.post("/bankingReport", BankingReportController)
// delete the entry 
router.delete("/:id", removeEntry)
router.delete("/bank/:id", bankRemoveEntry)



export { router as DailyReportRouter }