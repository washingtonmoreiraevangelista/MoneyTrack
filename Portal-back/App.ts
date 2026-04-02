import express from "express"
import {UserRouter } from "./router/User.router"
import { TransactionRouter } from "./router/transaction.router"

export const app = express()
const cors = require("cors")

app.use(cors())

app.use(express.json())

app.use("/users", UserRouter)
app.use("/transactions", TransactionRouter)

