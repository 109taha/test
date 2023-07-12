const router = require("express").Router();
const express = require ("express");
const UserController = require ("../controller/userController")

const app = express();
// const router = express.Router();
 
router.post("/register", UserController.userRegistor);
router.get("/login", UserController.loginUser);

module.exports = router;