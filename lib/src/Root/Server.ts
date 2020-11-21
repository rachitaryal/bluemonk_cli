import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './Routes'
import {console_logger} from 'bluemonk/lib/@utilities'
//create server
const server = express()

//config dotenv
dotenv.config()

//Routes Middlewares
server.use(cors());
server.use(bodyParser.json());

//Main Router
server.use("/", router);

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT || '',
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console_logger("Connected to Mongo Atlas")
);

//Start listening to server
const PORT = 5000;
const URL_MAIN = `http://localhost:${PORT}`
server.listen(PORT, () => console_logger(`Server is running on ${URL_MAIN}`));