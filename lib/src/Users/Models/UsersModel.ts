import {Schema, model, Document} from 'mongoose'

interface IUserSchema {
    name: string,
    email: string,
    password: string,
    [key:string]:any
}

const usersSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    }
})


export default model<IUserSchema & Document>('Users', usersSchema)