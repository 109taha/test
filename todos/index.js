const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/db.config");
const userRouter = require("./router/user_router")
const todosRouter = require("./router/todos_router")

dotenv.config();

const app = express();
app.use(express.json());

//home page
app.get('/', (req, res) => {
    res.send("<h1> welcome! </h1>");
})

//user router
app.use("/api/v1", userRouter);

//todos router
app.use("/todos", todosRouter);

//connecting port
const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => {
    console.log(`server is running on port: ${PORT}`)
});