import {loginValidation} from './UserFieldValidation'
import Users from '../Models/UsersModel'
import {Request, Response} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class UserLoginService {

    request:Request
    response: Response
    constructor(request:Request, response:Response){
        this.request = request
        this.response = response
    }

    async service() {
        const req = this.request
        const res = this.response
        //validate the field input value
        const {error} =  loginValidation(req)
        if(error) return { response: res.status(400).send({error : error.details[0].message})}

        //check if user already exists
        const user = await Users.findOne({email: req.body.email})
        if(!user) return { response: res.status(400).send({error: 'Invalid email or password'})}
        
        //check if the password matches
        const passwordMatch = await bcrypt.compare(req.body.password, user.password)
        if(!passwordMatch) return { response: res.status(400).send({error: 'Invalid email or password......'})}

        const secret_key = process.env.TOKEN_SECRET || ''
        const token = jwt.sign({ _id: user._id }, secret_key)
        return { response: res.header('auth-token', token).status(200).send({error: null, msg: 'logged in', 'auth-token': token})}
    }
    
}

export default UserLoginService
    