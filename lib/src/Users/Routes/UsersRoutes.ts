import express from 'express'
import {run} from 'bluemonk'
import {UserRegistrationController, UserLoginController} from '../Controllers/UsersControllers'

const app_router = express.Router()
app_router.post('/register', (req, res)=> run(UserRegistrationController, req, res))
app_router.post('/login', (req, res)=> run(UserLoginController, req, res))

export default app_router