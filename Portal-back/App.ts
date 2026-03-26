import express from "express"
import {UserRouter } from "./router/User.router"
import { TransactionRouter } from "./router/transaction.router"

export const app = express()


app.use(express.json())

app.use("/users", UserRouter)
app.use("/transactions", TransactionRouter)

