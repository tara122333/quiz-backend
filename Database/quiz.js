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
}, {
    timestamps : true
});

export const QuizModel = mongoose.model("quiz",QuizSchema);