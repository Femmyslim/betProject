


const createUsers = (req, res) =>{

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