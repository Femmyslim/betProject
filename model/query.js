const { uuid } = require("uuidv4")
const connection =require("./model/connection")
const {validateCreateUser} = require('../validation/validations')


const newUserQuery = (customer_firstname, customer_lastname, customer_email, customer_password) => {

    return new Promise((reject,resolve) =>{

        const customer_id =uuid4()
        connection.query(`INSERT INTO customer_system(customer_id, customer_firstname, customer_lastname, customer_email) 
            VALUE('${customer_id}','${customer_firstname}','${customer_lastname}','${customer_email}','${customer_password}')`,
            (err, results, fields) => {
                if (err) reject(err)
                resolve(results)
            }
        ) 
        connection.end()   
    }) 
       
}

const userEmailConfirmation = (email) => {

    return new Promise((reject,resolve) =>{

        connection.query(`SELECT * FROM punter where email ="${email}"`,
        (err, results, fields) => {
            if(err) reject(err)
            resolve(result)
        }           
    )
    connection.end()
    })
    
}


const betCreationQuery = (bet_id, bet_name, bet_description, bet_amount) => {

    return new Promise((reject, resolve) =>{

        connection.query(`INSERT INTO bet_table(bet_id, bet_name, bet_description, bet_amount) 
        VALUES('${bet_id}','${bet_name}','${bet_description}','${bet_amount}')`,
        (err, results, fields) => {
            if (err) reject(err)
                resolve(results)
        }  
    )
    connection.end()
    })
    
}

const bet_idConfirmation = (bet_id) => {

    return new Promise((reject,resolve) =>{

        connection.query(`SELECT * FROM punter where bet_id ="${bet_id}"`,
        (err, results, fields) => {
            if(err) reject(err)
            resolve(result)
        }           
    )
    connection.end()
    })
    
}

const getAllBetId = () => {

    return new Promise((resolve, reject) => {
         connection.query('SELECT * FROM punter',
            (err, results, fields) => {
                if (err) reject(err)
                resolve(results)
            }
        )
        connection.end()
    })
}    

module.exports= {newUserQuery, betCreationQuery, bet_idConfirmation, getAllBetId, userEmailConfirmation}