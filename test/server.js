const express = require ("express");
const dotenv = require ("dotenv");
dotenv.config();
const router = require("./routes/userRoutes");
const connectDB = require("./db/db");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use("/user", router ); 

app.listen(port, () =>{
    console.log(`server running on port ${port}`)
})

//
// /
// // /
// // // /
// // // // /
// // // // // api registor localhost:5000/user/register
// // // // // api login localhost:5000/user/login
// // // // // api todo localhost:5000/todo
// // // // // api creatTodo localhost:5000/creatTodo
// // // // // api deleteTodo localhost:5000/deleteTodo
// // // // // api updateTodo localhost:5000/updateTodo