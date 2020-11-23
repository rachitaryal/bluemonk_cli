import Joi from '@hapi/joi'
import {Request} from 'express'

const registerValidation = (req:Request) =>{

    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    const validate_object = schema.validate(req.body)
    return validate_object
}

const loginValidation = (req:Request) =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    const validate_object = schema.validate(req.body)
    return validate_object
}

export {
    registerValidation,
    loginValidation
}