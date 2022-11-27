import express from "express"
import { login, register } from "../controllers/UserController.js"

const router = express.Router()

//  login routes
router.post("/login", login)

//  signup routes
router.post("/register", register)

export default router