const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const user = require("./Routes/user");
require("dotenv").config();

const app = express();
const port = 4000;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

main().then(() => {
    console.log("Database connected");
}).catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hackathon', options);
}


app.use(bodyParser.json());
app.use(cors());
app.use(express.json())


app.use('/auth', user);

app.listen(port, (req, res) => {
    console.log(`server started ${port}`);
})