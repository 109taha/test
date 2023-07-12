const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    discription: {
        type: String,
        require: true
    },
    isComplete: {
        type: Boolean,
        // require: true,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("todos", todoSchema);