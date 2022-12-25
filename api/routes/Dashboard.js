import express from "express"
import { ChartData, CreditTotal, ExcessAmount, ShortAmount, TotalDebit, compilanceAmount, otherDebit } from "../controllers/DashboardController.js"

const router = express.Router()

// CreditTotal
router.get('/credit', CreditTotal)

// DebitTotal
router.get('/debit', TotalDebit)

// ExcessAmount
router.get('/ExcessAmount', ExcessAmount)

// ShortAmount
router.get('/ShortAmount', ShortAmount)

// ShortAmount
router.get('/Compliance', compilanceAmount)

// OtherDebit Amount
router.get('/otherDebit', otherDebit)

// Chart Amount
router.get('/chartData/:date', ChartData)



export { router as DashboardRoute}