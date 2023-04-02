import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    quizName: {
        type : String,
        require : true,
    },
    description: {
        type : String,
        required : true,
    },
    pointsGradingSystem: {
        type : Number,
        required : true,
    },
    timeLimit: {
        type : Number,
        required : true,
    },
    question: [
        {
            type : mongoose.Types.ObjectId,
            ref : "Question"
        }
    ],
}, {
    timestamps : true
});

export const QuizModel = mongoose.model("quiz",QuizSchema);