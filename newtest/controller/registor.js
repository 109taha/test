const User = require("../models/user.js");
// const CryptoJS = require("crypto-js");
const router = require("express").Router();

router.post(("/register"), async (req, res) =>{
    const {username, password} = req.body;
    
    try {
        const newUser = await User.findOne({username});
        if (newUser){
            return res.status(400).json("user already access")
        } 
        const NewUser = await User.create({ username, password});
        NewUser.save();
        res.send({username: NewUser.username, password:NewUser.password})
        console.log(username)
    } catch (err) {
        res.status(500).json("something went wrong")
    }
})


// //REGISTER
// router.post("/register", async (req, res) => {
//     const newUser = new userSchema({
//       username: req.body.username,
//       email: req.body.email,
//       password: CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.PASS_SEC
//       ).toString(),
//     });
//   console.log(username);
//     try {
//       const savedUser = await newUser.save();
//       res.status(201).json(savedUser);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
module.exports = router