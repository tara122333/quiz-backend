require("dotenv").config();

import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;


app.get("/", (req,res)=>{
    return res.status(200).json({message : "Success"});
});

app.listen(PORT,()=>{
    console.log("server has been listening");
});