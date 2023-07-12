const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helper/hashedpass");
const UserModel = require("../models/user_models");
const dotenv = require("dotenv");


//register controller
const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name) {
            res.status(500).send({ message: "name must be require!" });
        }

        if (!email) {
            res.status(500).send({ message: "email must be require!" });
        }

        if (!password) {
            res.status(500).send({ message: "password must be require!" });
        }

        //checking the email.
        const existinguser = await UserModel.findOne({ email });
        if (existinguser) {
            return res
                .status(500)
                .send({ message: "User Already Registered!" })
        }

        //register user.
        const hashedPassword = await hashPassword(password)
        const user = new UserModel({ name, email, password: hashedPassword }).save();
        res.status(200).send({ message: "user register successfully!", user });

    } catch (error) {
        res.status(500).send({ message: "something went wronge" })
    }
}


//login Controller

const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email and password are empty
        if (!email || !password) {
            res.status(404).send({
                success: false,
                message: "Username or Password is incorrect"
            });
        }

        // Find the user in the database
        const user = await UserModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            res.status(404).send({
                success: false,
                message: "invalid User Email"
            });
        }

        // Compare the password
        const match = await comparePassword(password, user.password);

        // Check if the passwords match
        if (!match) {
            res.status(400).send({
                success: false,
                message: "password is not matched!"
            });
        }

        // Generate the JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log(token)
        // Send the response
        res.status(200).send({
            success: true,
            message: "User logedIn",
            data: user,
            token
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "something went wronge!",
            error
        })
    }
}

module.exports = { registerController, loginController }