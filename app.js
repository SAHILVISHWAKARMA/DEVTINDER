const express = require('express');
const connectDB = require('./src/config/database');
const User = require('./src/models/user');
const app = express();

app.use(express.json());

//get user by mail
app.get('/user', async (req, res) => {
  let { email } = req.body;
  try {
    // const user = await User.find({ email });
    const user = await User.findOne({ email });
    if (user) {
      res.send({ message: "user found", user })
    } else {
      res.status(404).send({ comment: "user not found" })
    }
  } catch (err) {
    res.status(400).send("something went wrong"+err)
  }
});

//get all feed data 
app.get('/feed', async (req, res)=>{
  try{
    let users = await User.find();
    if(users){
      res.send({message:"users found",users})
    } else{
      res.status(400).send({message:"user not found"})
    }
  } catch(err){
    res.status(400).send("something went wrong"+err)
  }
  
});

//sign up the user
app.post('/signup', async (req, res) => {
  let { firstName, lastName, email, password, age, gender } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    age,
    gender
  });

  try {
    await user.save();
    res.send("user added successfully!!!");
  } catch (err) {
    res.status(400).send("unable to save user :", err.message)
  }
});

//delete user by id
app.delete('/user', async (req, res) =>{
  try{
    let {id} = req.body;
    let user = await User.findByIdAndDelete(id);
    res.send({message:"user deleted", user})
  } catch (err) {
    res.status(400).send("unable to save user :", err.message);
  }
});

// update the user
app.patch('/user', async (req, res) =>{
  try{
    let data = req.body;
    let user = await User.findByIdAndUpdate(data.id,data,{returnDocument:"after"});
    res.send({message:"user updated", user})
  } catch (err) {
    res.status(400).send("unable to save user :", err.message);
  }
});

connectDB().then((res) => {
  app.listen(6700, () => {
    console.log(`server listening on port 6700`);
  });
}).catch((err) => {
  console.log("failed to connect db ", err);
});

