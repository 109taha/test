const jwt = require("jsonwebtoken");

exports.authMiddleWare = async (req, res, next) => {
    try {
        const decode = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        next()
    } catch (error) {
        res.status(500).send({
            message: "something wronge!"
        })
    }
}