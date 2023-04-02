require("dotenv").config();
require("./Database/connection");
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import Quiz from './API/question';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use("/",Quiz);

app.get("/", (req,res)=>{
    return res.status(200).json({message : "Success"});
});

app.listen(PORT,()=>{
    console.log("server has been listening");
});