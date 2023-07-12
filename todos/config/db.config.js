const mongoose = require("mongoose")

const connect = mongoose.connect('mongodb://127.0.0.1:27017/todos')
    .then(() => console.log("mongodb database is connected!"))
    .catch(err => console.error("something went wrong in mongodb connection!"));

module.exports = connect