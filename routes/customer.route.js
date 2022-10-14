const express = require('express')
const router = express.Router()
const {createBet, createCustomer, bet_idConfirmation} = require("../controller/customer.controller")


routes.get( "/punter/:bet_id", bet_idConfirmation)

routes.post("/create/customer", createCustomer )

app.put("/update", createBet)

module.exports=router;