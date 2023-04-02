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

/*
route      ==> /quiz
method     ==> POST
Des        ==> get quiz based on the _id
params     ==> _id
Access     ==> public
*/

Router.get("/quiz/:_id",async(req,res)=>{
    try {
        const {_id} = req.params;
        const findQuiz = await QuizModel.findOne({_id});
        if(!findQuiz || findQuiz.length === 0){
            return res.status(201).json({message : "quiz not found"});
        }
        return res.status(200).json({findQuiz});
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }

});


/*
route      ==> /question
method     ==> POST
Des        ==> create question by using user
params     ==> _id
Access     ==> public
*/

Router.post("/question/:_id", async(req,res)=>{
    try {
        const {question} = req.body;
        const {_id} = req.params;
        const isValidOrNotID = await QuizModel.findById(_id);
        if(!isValidOrNotID || isValidOrNotID.length === 0){
            return res.status(500).json({message : "Wrong id"});
        }
        const findQuiz = await QuestionModel.findOne({quiz : _id});
        if(!findQuiz || findQuiz.length === 0){
            const newQuestionSchema = {
                quiz : _id,
                question : question
            }
            const questionData = await QuestionModel.create(newQuestionSchema);
            return res.status(200).json({questionData});
        }
        const questionData = await QuestionModel.findOneAndUpdate({quiz : _id},{
            $push : {
                question : question
            }
        }, {new : true});
        return res.status(200).json({questionData});
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;