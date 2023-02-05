import express from "express"
import { DeleteNewDscData, NewDscApi, allNewDscData } from "../controllers/DscController.js"

const router = express.Router()

// Create route
router.post("/new", NewDscApi)
router.post("/old", NewDscApi)

// get customerHead Data
router.get("/all", allNewDscData )

// Delete customerHead Data
router.delete("/:id", DeleteNewDscData )

export { router as NewDscRoute}