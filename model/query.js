const connection =require("./model/connection")


const newUserQuery = () => {
    return connection.query(
        `INSERT INTO customer_system(customer_id, customer_firstname, customer_lastname, customer_email) 
        VALUE('${customer_id}','${customer_firstname}','${customer_lastname}','${customer_email}','${customer_password}')`,
        (err, results, fields) => {
        
        }
    )    
}


const betCreationQuery = () => {
    connection.query(
        `INSERT INTO bet_table(bet_id, bet_name, bet_description, bet_amount) 
        VALUES('${bet_id}','${bet_name}','${bet_description}','${bet_amount}')`,
        (err, results, fields) => {
    
        }
    )
}

const afterBet_idConfirmation = (bet_id) => {
    connection.query(
        `INSERT INTO punter(customer_id, bet_id, bet_amount) 
        VALUES('${customer_id}','${bet_id}','${bet_amount})'`,
        (err, results, fields) => {
    

        }
               
    )
}

module.exports= {newUserQuery, betCreationQuery, afterBet_idConfirmation}