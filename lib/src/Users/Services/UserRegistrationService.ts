import {Request, Response} from 'express'
import Users from '../Models/UsersModel'
import {registerValidation} from './UserFieldValidation'
import bcrypt from 'bcryptjs'


class UserRegistrationService{
    request:Request
    response: Response
    constructor(request:Request, response:Response){
        this.request = request
        this.response = response
    }

    async service(){
        const req = this.request
        const res = this.response
        //validate the field input value
        const {error} =  registerValidation(req)
        if(error) return { response: res.status(400).send({error : error.details[0].message})}

        //check if user already exists
        const user = await Users.findOne({email: req.body.email})
        if(user) return { response: res.status(400).send({error: 'User already exists'})}

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword  = await bcrypt.hash(req.body.password, salt)
        
        //user object
        const userObject = new Users({
            name : req.body.name,
            email: req.body.email,
            password: hashPassword
        })
        try {
            const savedUser = await userObject.save();
            const return_data = {
                error: null,
                data: {
                    _id : savedUser._id,
                    msg: "User Created"
                }
            }
            return { response: res.status(200).send(return_data)}
        } catch (error) {
            return { response: res.status(400).send(error)}
        }
    }
}

export default UserRegistrationService