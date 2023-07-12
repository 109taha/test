const { JsonWebToken } = require("jsonwebtoken");
const User = require("../models/user");
// const bcrypt = require("bcrypt");

const createToken = (_id) => {
    jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
  };


const userRegistor = async ( req, res ) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    try {
        const newUser= await User.findOne({username, email})
        if (newUser) {
            return res.status(400).json("User Already Exist");
        }
        
        const RegisterUser = await User.create({
            username,
            email,
            password
        },)
        await RegisterUser.save();
        res.send({
            success: true,
            message: "user created succesfully",
            username: RegisterUser.username,
          });                 
    } catch (error) {
        res.status(500).json(`Error from users.controller.js signup: ${(error.message)}`);
    }
}

// const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       res.send({
//         success: false,
//         message: "Username and password are required!",
//       });
//       return; 
//     }
//     try {
//       const user = await User.findOne({ username});
//       if (!user) {
//         res.send({
//           success: false,
//           message: "Username or password is invalid",
//         });
//         console.log(username, password)
//       }     
//       const password = User.findOne(pasword);
//       if(!pasword){
//         res.send({
//             success: false,
//             message: "Username or password is invalid",
//         })
//       } else {
        
//         await user.loginUser();
//         res.send({
//           success: true,
//           message: "User logged in!",
//         });
//       }
//     } catch (error) {
//       res.status(500).json("Something went wrong!");
//     }
//   };











//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // create token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  res.json({ msg: "login user" })
 }














// const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         res.send({
//           success: false,
//           message: "Username and password are required!",
//     });

//     try {
//       const user = await User.findOne({ username, password });
  
//     }
//      if (!User) {
//         res.send({
//           success: false,
//           message: "Username or password is invalid",
//         });
//         console.log(username, password);
//       } else {
//         await user.loginUser();
//         res.send({
//           success: true,
//           message: "User logged in!",
//         });
//       }
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: "Something went wrong!",
//       });
//     }
//   };
  
module.exports = {
    userRegistor,
    loginUser,
}