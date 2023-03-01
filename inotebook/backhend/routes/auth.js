const express = require('express');
const {body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fetchuser = require('../middleware/fetchuser')


const JWT_SECRET = process.env.JWT_SECRET;

// Route 1: create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
], async(req, res) =>{
  let success = false;
  //if there are errors, return bad request and errors
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({success, errors: errors.array()});
  }

  // Check whether the user with this email exist already
  try{
  let user = await User.findOne({email: req.body.email});
  if(user){
    return res.status(400).json({success, errors: "Sorry this email alraedy exist"})
  }
const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt)


  //Create a new user
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass
  });
  console.log('create', user);
  const data = {
    user:{
      id: user._id,
     }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
console.log('oooooo', authtoken)

  //res.json(user)
 // success = true;
  res.json({success: true , authtoken});

} catch (error) {
  console.error('1234', error.message);
  res.status(500).send("Some Error occured");
}
  // .then(user => res.json(user))
  // .catch(err => {console.log(err)
  //   res.json({err: "Please enter a uniq value", message: err.message})})
})

// Route 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cant be blank').exists(),
], async(req, res) =>{
  let success = false;
//if there are errors, return bad request and errors
const errors = validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors: errors.array()});
}

const {email, password} = req.body;
try{
  let user = await User.findOne({email})
  if(!user){
    success = false
    return res.status(400).json({error: "Please try to login with correct credentials"})
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if(!passwordCompare){
    success = false;
    return res.status(400).json({success, error: "Please try to login with correct credentials"})
  }

  const data = {
    user:{
      id: user._id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
  res.json({success, authtoken})
}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}

})

// Route 3: Get login  User details using: POST "/api/auth/getuser".  login required
router.post('/getuser', fetchuser, async(req, res) =>{
try {
  userId = req.user.id
 //console.log(userId)
  const user = await User.findById(userId).select("-password")
 
res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}
})


module.exports = router