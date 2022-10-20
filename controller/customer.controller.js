const e = require('express')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const { newUserQuery, betCreationQuery, bet_idConfirmation, getAllBetId, userEmailConfirmation } = require('../models/query')
const {validateCreateUser} = require("../validation/validations")


const createBet = (req,res) =>{
    
        const data = [
        
            {
            bet_id: "bet_id",
            bet_name: "bet_name",
            bet_description: "bet_description",
            bet_amount: "bet_amount"
            },

            {
            bet_id_2: "12985",
            bet_name: "betflu",
            bet_description: "firstddouble set",
            bet_amount: 15000
            },

        ]  

        const {bet_id,bet_name,bet_description,bet_amount} = req.body
        if( !bet_id || !bet_name, bet_description, bet_amount){
            res.status(400).json({
                message: 'All fields required'
            })
        }
    
        try {
            bet_idConfirmation(bet_id)
            .then(responseFromConfirmBetAvailability => {
                if(responseFromConfirmBetAvailability.length > 0){
                    throw new error ("Bet id exist")
                }
                return betCreationQuery(bet_id, bet_name, bet_description, bet_amount)
            })
        } catch (error) {
            res.status(400).json({
                status: false,
                message: e.message
            })
        }

}   

const createCustomer = (req, res) =>{

    const customer_id = uuidv4()
    const {customer_firstname,customer_lastname,customer_email,customer_password} = req.body
    if( !customer_firstname || !customer_lastname || !customer_email || !customer_paasword){
        res.status(400).json({
            message: " All fields required"
        })
    }

    try {
        userEmailConfirmation(email)
        .then(responseFromCheckEmail =>{
            if(responseFromCheckEmail.length > 0){
                throw new error ('email exist')
            }
            return newUserQuery(customer_id, customer_firstname, customer_lastname, customer_email, customer_password)
        })
        .then(newUserCreationResult => {
            res.status(200).json({
                message: 'Account created successfully'
            })
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: e.message
        })
    }

}

const bet_idConfirmation = (req, res) =>{

    const {bet_id} = req.params
    const maxPlayer = []
    
        if(bet_id[bet_id.length-1] <= 10){
            maxPlayer += punter.bet_id[bet_id.length-1] 
            res.status(200).json({
               message: `${bet_id} available for bet`
            })
        }else {
            res.status(503).json({
                message: `${bet_id} unavailable for bet`
             })
        }
    }        



module.export = {createBet, createCustomer, bet_idConfirmation} ; 