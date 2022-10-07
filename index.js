require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const joi = require('joi')
const {uuid} = require('uuidv4')
const app = express()
const port =1002


app.use(bodyParser.json())


const connection = mysql.createConnection({
    localhost: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_Name
});



app.put("/update", (req,res) =>{
    const bet_table = [
        {
        bet_id: 12345,
        bet_name: 'betray',
        bet_description: 'firstdrawn set',
        bet_amount: $15
       },
       {
        bet_id: 12985,
        bet_name: 'betflu',
        bet_description: 'firstddouble set',
        bet_amount: $15
       },
       {
        bet_id: 23345,
        bet_name: 'betblue',
        bet_description: 'doublechance set',
        bet_amount: $15
       },
]   

connection.query(
    `INSERT INTO bet_table(bet_id, bet_name, bet description, bet_amount) 
    VALUES('${bet_id}','${bet_name}','${bet_description},'${bet_amount}')`),

})




app.post("/create/customer", (req, res) =>{
    const customer_id = uuidv4

    const schemaCustomer = joi.object({ 
        customer_firstname: Joi.string().min(4).max(30).required(),
        customer_lastname: Joi.string().min(4).max(30).required(),
        customer_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        customer_email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    const { error, value } = schemaCustomer.validate(req.body)

    connection.query(
    `INSERT INTO customer_system(customer_id, customer_firstname, customer_lastname, customer_email, customer_password) 
    VALUE('${customer_id}','${customer_firstname}','${customer_lastname}','${customer_email}','${customer_password}')`,
    (err, results, fields) => {
    if(error != "undefined") {
        
        res.status(400).send({ 
            status: false,
            message: 'validation error'
        })
    }else{
        res.status(201).json({
            status: true,
            message: 'New user created succesfully'
        })
       }
   }  
  )
})



   

app.get("/punter/:bet_id", (req, res) =>{

    const {bet_id} = req.params

    if(!bet_id || punter.length>10){
        res.status(404).json({
            message: `Betname unvailable`,
            data: bet_table
        })
    }
        res.status(200).json({
            message: `Betname ${bet_id} available`,
            data: bet_table
        })

    connection.query(
        `INSERT INTO punter(customer_id, bet_id, bet_amount) 
        VALUES('${customer_id}','${bet_id}','${bet_amount})'`,
        (err, results, fields) => {
            if (err) {
                throw new Error("This is on us, please try later")
            }


            res.status(201).json({
                message: "Account succesfully created",
                data: {
                    customer_id,
                    bet_id,
                    bet_amount,
                }
            })

        }
        
        
    )
})
    
    


   
    
    

















app.listen(port, () => {
    console.log(`This is listening on port ${port} `)
})