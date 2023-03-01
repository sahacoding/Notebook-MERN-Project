const jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagood$boy";

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  //console.log(token);
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token na"});
   // console.log('token', error)
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
   // console.log('data', data)
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
   // console.log('auth', error)
  }
}; 

module.exports = fetchuser;
