const Joi = require('joi')

const validateCreateUser =() => {
    schemaCustomer = Joi.object({ 
        customer_firstname: Joi.string().min(4).max(30).required(),
        customer_lastname: Joi.string().min(4).max(30).required(),
        customer_email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        customer_password: Joi.string()
    })
}
const { error, value } = schemaCustomer.validate(req.body)



module.exports= {validateCreateUser}