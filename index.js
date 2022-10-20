require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port =process.env.APP_PORT
// const customerRoutes = require('./routes/customer.route')
const { router } = require('./routes/customer.route')


app.use(bodyParser.json())
app.use(router)




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
        VALUES('${bet_id}','${bet_name}','${bet_description}','${bet_amount}')`,
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
        message: e.message || 'validation error',
    })    
  }
}) 




   

app.get("/punter/:bet_id", (req, res) =>{

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

        try {
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

        } catch (error) {
            res.status(400).send({ 
                status: false,
                message: e.message || 'validation error',
            })     
        }
        
    
})
    
    


   
    
    

















app.listen(port, () => {
    console.log(`This is listening on port ${port} `)
})