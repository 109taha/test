const { getTodos, createTodo, updateTodo } = require("../controller/todo.Controller");
const express = require("express");
const router = express();

//GET all todos
router.get("/", getTodos);

//post create a todos
router.post("/creat-todos", createTodo)

//post Updatetodos
router.post("/update-todos", updateTodo)



module.exports = router