const express = require('express');
const app = express();


app.get("/admin/:name/:age", (req, res) => {
  res.send({name:req.params.name,age:req.params.age,comment:req.query.comment});
});

app.get("/user", (req, res) => {
  res.send({name:"admin",age:23});
});

app.post("/user", (req, res) => {
//   res.send(`user posted a comment : ${req.body.comment}`);  //TODO
  res.send(`user posted a comment.`);
});

app.delete("/user", (req, res) => {
  res.send("deleted");
});

app.use("/", (req, res) => {
  res.send("hello use");
});

app.listen(6700, () => {
  console.log(`server listening on port 6700`);
});
