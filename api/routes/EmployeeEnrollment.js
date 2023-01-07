import express from "express"
import { IndividualReportController, createEmployeeEnrollment, monthlyReportController, removeEntry} from "../controllers/EmployeeEnrollmentController.js"

const router = express.Router()

//  create routes
router.post("/", createEmployeeEnrollment)

//  individualReport routes
router.post("/individualReport", IndividualReportController)

//  historicalReport routes
router.post("/historicalReport", monthlyReportController)

//  historicalReport routes
router.delete("/:id", removeEntry)


export default router