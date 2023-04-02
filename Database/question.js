import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({

    quiz: {
        type: mongoose.Types.ObjectId,
        ref: "quiz",
    },
    question: [{
        questionName: {
            type: String,
            required: true
        },
        option1: {
            type: String,
            required: true
        },
        option2: {
            type: String,
            required: true
        },
        option3: {
            type: String,
            required: true
        },
        option4: {
            type: String,
            required: true
        },
        isMultipleAnswer: {
            type: Boolean,
            default: false
        },
        answer: {
            type: String,
        },
        answer1: {
            type: String,
        },
        answer2: {
            type: String,
        },
        answer3: {
            type: String,
        },
        answer4: {
            type: String,
        },
        marks: {
            type: String,
        },
    }]
},
    { timestamps: true });

export const QuestionModel = mongoose.model("question", QuestionSchema);