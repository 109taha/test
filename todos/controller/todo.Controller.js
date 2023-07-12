// const mongoose = require("mongoose");
// const todosModel = require("../models/todo_models");
// const ObjectId = require("mongoose").Types.ObjectId;
// const authMiddleWare = require("../middleware/authMiddleware");
// const UserSchema = require("../models/user_models")

// //Get all todos
// const getAllTodos = (authMiddleWare, async (req, res) => {
//     const id = req.params.id
//     const todos = await todosModel.findById(id)
//     try {
//         if (!todos) {
//             return res.send("no todos found on this user")
//         }
//         // if (id !== todos) {
//         //     res.send("no todos found on that user")
//         // }
//         return res.send({
//             success: true,
//             message: "following are the todos",
//             todos
//         })
//     } catch (error) {
//         res.status(500).send({
//             success: false,
//             message: "something wronge!"
//         })
//     }
// })

// // create todos
// const createTodos = (authMiddleWare, async (req, res) => {
//     const UserSchema = req.user;
//     const todo = req.body;
//     try {
//         const { title, discription } = req.body;
//         console.log(title, discription)
//         if (!title) {
//             return res.send("title must be require")
//         }
//         if (!discription) {
//             return res.send("discription must be require")
//         }
//         console.log(user)
//         if (ObjectId.isValid(todos.createdBy)) {
//             return res.send("user Id is not valid")
//         }

//         const create = await todosModel.create(todo);
//         console.log(create)
//         res.send("todos created!");
//         create.save();
//         // res.send("todos created!");
//     } catch (error) {
//         res.send("error")
//     }
// })

// //update todos
// const updateTodos = (authMiddleWare, async (req, res) => {
//     const updatedata = req.body;
//     const user = req.user;
//     const id = user._id;
//     if (!ObjectID.isValid(_id)) {
//         return res.status(400).send({ success: false, message: "invalid todo id" });
//     }
//     try {
//         const todo = await TodosModel.findById(_id);
//         if (!todo) {
//             return res.status(404).send({
//                 success: false,
//                 message: "todo not found",
//             });
//         }

//         // validating if user is modifying his own todos
//         if (user.id != todo.createdBy) {
//             return res.status(401).send({
//                 success: false,
//                 message: "You are not allowed to updatae this todo",
//             });
//         }

//         await TodosModel.findOneAndUpdate(
//             { _id },
//             updatedData,
//             { new: true },
//             (err, todo) => {
//                 if (err) {
//                     return res
//                         .status(401)
//                         .send({ success: false, message: "error updating todo", err });
//                 }
//                 return res.send({
//                     success: true,
//                     message: `updated todo: ${todo._id}`,
//                     todo,
//                 });
//             }
//         );
//     } catch (error) {
//         console.log("error updating todo ", error);
//         res
//             .status(500)
//             .send({ success: false, messgae: "error while updating todo" });
//     }
// })
// module.exports = { getAllTodos, createTodos, updateTodos }

const { ObjectID } = require("mongoose").Types.ObjectId;

const { TodosModel } = require("../models/todo_models");

// ====== get all todos of user ======
// @url: api/v1/todos/
exports.getTodos = async (req, res) => {
    const user = req.user;
    try {
        const todos = await TodosModel.find({ createdBy: user.id });
        if (!todos) {
            return res.send({ success: true, message: "no todos found!" });
        }

        return res.send({ success: true, todos });
    } catch (error) {
        console.log("Error at todosController: ", error);
        res.status(500).send({ message: "internal server error" });
    }
};

// get todo of user by id
exports.getTodosByID = (req, res) => {
    const id = req.params.id;
    const todos = TodosModel.findById(id);
    console.log(todos);
    todos.length
        ? res.send(todos)
        : res.status(404).send("No todos found");
    console.dir;
};

// ====== Creat new todo ======
// @url: api/v1/todos/create
exports.createTodo = async (req, res) => {
    const user = req.user;
    const { todo } = req.body;

    // validating user id
    if (!ObjectID.isValid(todo.createdBy)) {
        return res.status(400).send({ success: false, message: "user id not valid!" });
    }

    // validating if user is modifying his own todos
    if (user.id !== todo.createdBy) {
        return res.status(401).send({
            success: false,
            message: "You are not allowed to create todos for other users",
        });
    }

    try {
        const createdTodo = await TodosModel.create(todo);
        createdTodo.save();
        res.send({ success: true, message: "todo created successfully" });
    } catch (error) {
        console.log("error creating tood ", error);
        res
            .status(500)
            .send({ success: false, messgae: "error while creating todo" });
    }
};

// ====== Update todo ======
// @url: api/v1/todos/update/id
exports.updateTodo = async (req, res) => {
    const _id = req.params.id;
    const { updatedData } = req.body;
    const user = req.user;

    if (!ObjectID.isValid(_id)) {
        return res.status(400).send({ success: false, message: "invalid todo id" });
    }
    try {
        const todo = await TodosModel.findById(_id);
        if (!todo) {
            return res.status(404).send({
                success: false,
                message: "todo not found",
            });
        }

        // validating if user is modifying his own todos
        if (user.id != todo.createdBy) {
            return res.status(401).send({
                success: false,
                message: "You are not allowed to updatae this todo",
            });
        }

        await TodosModel.findOneAndUpdate(
            { _id },
            updatedData,
            { new: true },
            (err, todo) => {
                if (err) {
                    return res
                        .status(401)
                        .send({ success: false, message: "error updating todo", err });
                }
                return res.send({
                    success: true,
                    message: `updated todo: ${todo._id}`,
                    todo,
                });
            }
        );
    } catch (error) {
        console.log("error updating todo ", error);
        res
            .status(500)
            .send({ success: false, messgae: "error while updating todo" });
    }
};

// ====== Delete todo ======
// @url: api/v1/todos/delete/id
exports.deletetodo = async (req, res) => {
    const _id = req.params.id;
    const user = req.user;

    if (!ObjectID.isValid(_id)) {
        return res.status(400).send({ success: false, message: "invalid todo id" });
    }

    try {
        const todo = await TodosModel.findById(_id);
        if (!todo) {
            return res.status(404).send({
                success: false,
                message: "todo not found",
            });
        }

        // validating if user is modifying his own todos
        if (user.id != todo.createdBy) {
            return res.status(401).send({
                success: false,
                message: "You are not allowed to delete this todo",
            });
        }

        // The findByIdAndDelete() function is used to find a matching document,
        //removes it, and passing the found document (if any) to the callback.
        await TodosModel.findByIdAndDelete({ _id }, (err, todo) => {
            if (err) {
                console.log(`could not delete ${todo._id}`);
                return res
                    .status(400)
                    .send({ success: false, message: "could not delete todo", err });
            }
            if (!todo) {
                console.log("no todos found ", todo);
                return res
                    .status(401)
                    .send({ success: false, message: "todo not found!" });
            }

            return res.send({ success: true, message: `deleted  todo: ${todo._id}` });
        });
    } catch (error) {
        console.log("error deleting todo ", error);
        res
            .status(500)
            .send({ success: false, messgae: "error while deleting todo" });
    }
};
