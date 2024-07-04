import express from 'express';
import cors from 'cors'
import mongoose from "mongoose";
import router from '../Routes/index.js';
import dotenv from 'dotenv';
import bodyParser from "body-parser"
// const bodyParser = require('body-parser');
import cookieParser from 'cookie-parser'

const app = express();



main().then(() => {
    console.log("Database connected");
}).catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hackathon');
}


dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }))

app.listen(process.env.PORT, (req, res) => {
    console.log(`server started at port: ${process.env.PORT}`);
})

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.use('/',router)