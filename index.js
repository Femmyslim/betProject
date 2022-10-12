require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port =1002
const customerRoutes = require('./routes/customer.route')


app.use(bodyParser.json())


const connection = mysql.createConnection({
    localhost: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});



app.put("/update", (req,res) =>{

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

   try {
    connection.query(
        `INSERT INTO bet_table(bet_id, bet_name, bet_description, bet_amount) 
        VALUEs('${bet_id}','${bet_name}','${bet_description}','${bet_amount}')`,
        (err, results, fields) => {
    
            if(err){
                console.log("i got here", err)
                throw new Error("Downtime experience")
            }
             res.status(200).send({
                status: true,
                message: "Bet successfully update"
             })

        })
   } catch (error) {
    console.log("i got here", error)
    res.status(404).send({
        status: false,
        message: error.message || "Downtime experience"
     })
   }
    

})




app.post("/create/customer", (req, res) =>{

    const {customer_firstname,customer_lastname,customer_email,customer_password} = req.body

    const customer_id = uuidv4()

    const schemaCustomer = Joi.object({ 
        customer_firstname: Joi.string().min(4).max(30).required(),
        customer_lastname: Joi.string().min(4).max(30).required(),
        customer_email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        customer_password: Joi.string()
    })

    const { error, value } = schemaCustomer.validate(req.body)
    console.log("i got here", error)

    if (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })    
    }

    try{

    connection.query(
    `INSERT INTO customer_system(customer_id, customer_firstname, customer_lastname, customer_email) 
    VALUE('${customer_id}','${customer_firstname}','${customer_lastname}','${customer_email}','${customer_password}')`,
    (err, results, fields) => {
    if(err) {
        throw new Error('connection error, try again')
     }
    }, 
        res.status(201).json({
            status: true,
            message: 'New user created succesfully'
        })
  )
} catch (e) {
    res.status(400).send({ 
        status: false,
        message: e.message || 'validation error'
    })    
  }
}) 




   

app.get("/punter/:bet_id", (req, res) =>{

    const {bet_id} = req.params
    // let count = 1
    // for(let i = 0 ; i <= 10; i++){
    //     if(){
    //         count += 
    //     }
    // }

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