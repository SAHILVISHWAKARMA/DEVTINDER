const express = require('express');
const connectDB = require('./src/config/database');
const User = require('./src/models/user');
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUpdateUserData } = require('./src/utils/validation');
const { isAllowUpdate } = require('./src/utils/common');
const { authUser } = require('./src/middlewares/auth');
const app = express();

app.use(express.json());
app.use(cookieParser());

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
    res.status(400).send("something went wrong" + err)
  }
});

//get all feed data 
app.get('/feed', async (req, res) => {
  try {
    let users = await User.find();
    if (users) {
      res.send({ message: "users found", users })
    } else {
      res.status(400).send({ message: "user not found" })
    }
  } catch (err) {
    res.status(400).send("something went wrong" + err)
  }

});

//sign up the user
app.post('/signup', async (req, res) => {
  let { firstName, lastName, email, password, age, gender } = req.body;
  const hashPassword = await bcrypt.hash(password, 10)
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    age,
    gender
  });

  try {
    await User.save();
    res.send("user added successfully!!!");
  } catch (err) {
    res.status(400).send("unable to save user :", err);
  }
});

//login the user
app.post('/login', async (req, res) => {
  let { email, password} = req.body;
  try {
    const user = await User.findOne({email}).select('+password');
    if(!user) res.status(404).send("User not found!!!");
    else {
      const isCorrectPassword = await user.validatePassword(password);
      if(!isCorrectPassword)  res.status(401).send("Invalid user name or password!!!");
      else {
        const token = await user.getJWT();
        res.cookie("token",token);
        res.send({msg:"user logged in successfully!!!",user});
      }
    }
  } catch (err) {
    res.status(400).send("Something went wrong :", err.message);
  }
});

//profile
app.get('/profile',authUser, async (req, res) => {
  try {
    let user = req.user;
    if(!user) throw new Error();
    res.send({ message: "user found", user });
  } catch (err) {
    res.status(400).send("unable to find user :", err);
  }
});


//delete user by id
app.delete('/user', async (req, res) => {
  try {
    let { id } = req.body;
    let user = await User.findByIdAndDelete(id);
    res.send({ message: "user deleted", user });
  } catch (err) {
    res.status(400).send("unable to save user :", err);
  }
});

// update the user
app.patch('/user/:id', async (req, res) => {
  try {
    let data = req.body;
    let id = req.params?.id
    // validateUpdateUserData(data);
    if (!isAllowUpdate(data)) {
      throw new Error("Update not allowed");
    };
    let user = await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
    res.send({ message: "user updated", user });
  } catch (err) {
    res.status(400).send("unable to save user :", err);
  }
});

connectDB().then((res) => {
  app.listen(6700, () => {
    console.log(`server listening on port 6700`);
  });
}).catch((err) => {
  console.log("failed to connect db ", err);
});

