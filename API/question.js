import express from 'express';
import { QuizModel } from '../Database/quiz';
import { QuestionModel } from '../Database/question';

const Router = express.Router();


/*
route      ==> /create
method     ==> POST
Des        ==> create quiz by using user
params     ==> none
Access     ==> public
*/

Router.post("/create", async(req,res)=>{
    try {
        const {quiz} = req.body;
        const quizData = await QuizModel.create(quiz);
        return res.status(200).json({quizData});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});


export default Router;