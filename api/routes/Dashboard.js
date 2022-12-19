import express from "express"
import { CreditTotal, ExcessAmount, ShortAmount, TotalDebit } from "../controllers/DashboardController.js"

const router = express.Router()

// CreditTotal
router.get('/credit', CreditTotal)

// DebitTotal
router.get('/debit', TotalDebit)

// ExcessAmount
router.get('/ExcessAmount', ExcessAmount)

// ShortAmount
router.get('/ShortAmount', ShortAmount)



export { router as DashboardRoute}