const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const { newUserQuery, betCreationQuery, afterBet_idConfirmation } = require('../models/query')
const {validateCreateUser} = require("../validation/validations")


const createBet = (req,res) =>{

    const {bet_id,bet_name,bet_description,bet_amount} = req.body
    
        const data = [
            // {
            // bet_id_1: 12345,
            // bet_name: 'betray',
            // bet_description: 'firstdrawn set',
            // bet_amount: $15
            // },
            {
            bet_id: bet_id,
            bet_name: bet_name,
            bet_description: bet_description,
            bet_amount: bet_amount
            }

            // {
            // bet_id_2: 12985,
            // bet_name: 'betflu',
            // bet_description: 'firstddouble set',
            // bet_amount: 15000
            // },

            // {
            // bet_id_3: 23345,
            // bet_name: 'betblue',
            // bet_description: 'doublechance set',
            // bet_amount: 10000
            // },
        ]  
}   

const createCustomer = (req, res) =>{

    const schemaCustomer = Joi.object({ 
        customer_firstname: Joi.string().min(4).max(30).required(),
        customer_lastname: Joi.string().min(4).max(30).required(),
        customer_email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        customer_password: Joi.string()
    })

    const { error, value } = schemaCustomer.validate(req.body)
    console.log("i got here", error)

    if (error !=undefined) {
        res.status(400).json({
            status: false,
            message: error
        })    
    }

    const {customer_firstname,customer_lastname,customer_email,customer_password} = req.body

    const customer_id = uuidv4()
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