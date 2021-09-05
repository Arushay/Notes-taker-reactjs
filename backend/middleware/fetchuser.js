const jwt = require('jsonwebtoken');
const JWT_SECRET = "BIG-SECRET";

const fetchuser = (req, res, next)=>{
    // get the user from jwt token & add id to req object
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({error: "Please authenticate with a valid token." })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
        
    } catch (error) {
        res.send(401);
    }
   
}

module.exports = fetchuser;