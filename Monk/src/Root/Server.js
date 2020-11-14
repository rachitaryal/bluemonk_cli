const express = require("express");
const server = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./Routes");

const monk_dir = '../../Monk/'
const {console_logger} = require(`${monk_dir}@_utilities`)
dotenv.config();

//Routes Middlewares
server.use(cors());
server.use(bodyParser.json());

//Main Router
server.use("/", router);

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console_logger("Connected to Mongo Atlas")
);

//Start listening to server
const PORT = 5000;
const URL_MAIN = `http://localhost:${PORT}`
server.listen(PORT, () => console_logger(`Server is running on ${URL_MAIN}`));