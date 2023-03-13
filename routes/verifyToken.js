const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
            if (error) return res.status(403).json("token invalid");

            //success
            req.user = user;
            next();
        })
    }
    else {
        return res.status(401).json("no headers")
    }
}

const verifyTokenAndAuthorisation = (req, res, next) => {

    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json("not allowed");
        }
    })

}

const verifyTokenAndAdmin = (req, res, next) => {

    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        }
        else {
            return res.status(403).json("not allowed");
        }
    })

}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorisation,
    verifyTokenAndAdmin
}