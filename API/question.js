import express from 'express';
import { QuizModel } from '../Database/quiz';
import { QuestionModel } from '../Database/question';

const Router = express.Router();

/*
route      ==> /all
method     ==> POST
Des        ==> find all quiz
params     ==> none
Access     ==> public
*/

Router.get("/all", async(req,res)=>{
    try {
        const quizData = await QuizModel.find();
        if(!quizData || quizData.length ===0){
            return res.status(201).json({message : "Quiz not found"});
        }
        // console.log(quizData);
        return res.status(200).json({quizData});
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }
});

/*
route      ==> /create
method     ==> POST
Des        ==> create quiz by using user
params     ==> none
Access     ==> public
*/

Router.post("/create", async(req,res)=>{
    try {
        const {quizData} = req.body;
        const quizAllData = await QuizModel.create(quizData);
        return res.status(200).json({quizAllData});
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

Router.post("/createquestion/:_id", async(req,res)=>{
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
            console.log(newQuestionSchema);
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


/*
route      ==> /question
method     ==> POST
Des        ==> find question by using _id
params     ==> _id
Access     ==> public
*/
Router.get("/question/:_id",async(req,res)=>{
    try {
        const {_id} = req.params;
        const findQuestion = await QuestionModel.findOne({'question._id' : _id});
        if(!findQuestion || findQuestion.length === 0){
            return res.status(201).json({message : "quiz not found"});
        }
        const result = findQuestion.question.filter(function(item){return item._id == _id});
        // console.log(result);
        return res.status(200).json({result});
    } catch (error) {
        return res.status(500).json({ error: error.message });
        
    }

});


/*
route      ==> /quiz/question
method     ==> get
Des        ==> get quiz by using _id
params     ==> _id
Access     ==> public
*/
Router.get("/quiz/question/:_id", async(req,res)=>{
    try {
        const {_id} = req.params;
        const quizQuestionData = await QuestionModel.findOne({quiz : _id});
        // console.log(quizQuestionData);
        return res.status(200).json({quizQuestionData});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*
route      ==> /question
method     ==> delete
Des        ==> delete quiz by using _id
params     ==> _id
Access     ==> public
*/
Router.delete("/delete/quiz/:_id", async(req,res)=>{
    try {
        const {_id} = req.params;
        await QuizModel.findByIdAndDelete(_id);
        await QuestionModel.findOneAndDelete({quiz : _id});
        return res.status(200).json({message : "Quiz deleted successfully"});

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});



/*
route      ==> /delete/quiz/question
method     ==> delete
Des        ==> delete quiz question by using question _id
params     ==> _id  
Access     ==> public
*/
Router.delete("/delete/quiz/question/:_id", async(req,res)=>{
    try {
        const {_id} = req.params;
        const newData = await QuestionModel.findOneAndUpdate(
            {'question._id' : _id},
            {
                $pull : {
                    'question' : {
                        _id : _id
                    }
                }
            },
            {
                new:true
            }

        )

          return res.status(200).json({newData});
          
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})




/*
route      ==> /update/quiz/question
method     ==> update
Des        ==> update quiz question by using question _id
params     ==> _id  
Access     ==> public
*/
Router.put("/update/quiz/question/:_id", async(req,res)=>{
    try {
        const {_id} = req.params;
        const {question} = req.body;
        const UpdatedData = await QuestionModel.findOneAndUpdate(
            {'question._id' : _id},
            {
                $set : {
                    'question.$' : question
                },
            },
            { new : true }
            );
        console.log(UpdatedData);
        return res.status(200).json({UpdatedData});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;