import express from "express"
import { login, register, verifyToken } from "../controllers/UserController.js"

const router = express.Router()

//  login routes
router.post("/login", login)

//  signup routes
router.post("/register", register)

//  Verify Token
router.get("/verifyToken", verifyToken)

export default router