import {Request, Response} from 'express'
import {ApiCreateController} from 'bluemonk'
import UserLoginService from '../Services/UserLoginService'
import UserResgistrationService from '../Services/UserRegistrationService'


class UserRegistrationController extends ApiCreateController{

    async post(req:Request, res:Response){

        const urs = new UserResgistrationService(req, res)
        const response_obj = await urs.service()
        if(response_obj) return response_obj.response

    }
}

class UserLoginController extends ApiCreateController{

    async post(req:Request, res:Response){
        const uls = new UserLoginService(req, res)
        const response_obj = await uls.service()
        if(response_obj) return response_obj.response
    }
}


export {
    UserRegistrationController,
    UserLoginController
}