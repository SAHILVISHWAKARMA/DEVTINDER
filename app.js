const express = require('express');
const connectDB = require('./src/config/database');
const User = require('./src/models/user');
const app = express();

app.post('/signup',async (req, res)=>{
  const user = new User({
    firstName:"virat",
    lastName:"kohli",
    email:"virat@kohli123.com",
    password:"virat@123",
    age:34,
    gender:"male"
  });

  try{
    await user.save();
    res.send("user added successfully!!!");
  } catch(err){
    res.status(400).send("unable to save user :",err.message)
  }
})

connectDB().then((res)=>{
  app.listen(6700, () => {  
    console.log(`server listening on port 6700`);
  });
}).catch((err)=>{
  console.log("failed to connect db ",err);
})

