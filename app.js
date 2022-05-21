const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8000;
const app = express();

// https://freestrokes.tistory.com/138

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/static', express.static('public')); 

app.listen(port, () => console.log(`Server up and running on port ${port}.`));

const db = require("./models");
const res = require('express/lib/response');
const User = db.User;
const Board = db.Board;
const Comment = db.Comment;

app.get("/", (req, res) => {
  console.log('---');
  res.json({ message: "Welcome to our application." });
});

app.get("/board/all", async (req, res) => {
  const board = await Board.findAll({
    order: [["createdAt", "DESC"]],
  })
  return res.json({board: board});
})

app.post("/board/create", async (req, res) => {
  const data = req.body;
  const board = await Board.create({
    title: data.title,
    desc: data.desc,
  })
  res.json({success: true})
})

app.get("/board/", async (req, res) => {
  const id = parseInt(req.query['id']);
  const board = await Board.findOne({
    where: {id: id}
  })
  const comments = await board.getComments();
  return res.json({board: board, comments: comments});
})

// app.patch("/board/modify", async (req,res)=>{
//   const data = req.body;
//   const board = await Board.findOne({
//     where: {id: data.id}
//   })
//   board.title = data.title;
//   board.desc = data.desc;
//   await board.save();
//   return res.json(board);
// })

app.patch("/board/modify", async (req,res)=>{
  const data = req.body;
  const updateboard = await Board.update(data, {
    where: {id: data.id}
  })
  return res.json(updateboard);
})

app.delete("/board/", async (req, res) => {
  const id = parseInt(req.query['id']);
  const board = await Board.destroy({
    where: {id: id}
  })
  return res.json({board: board});
})

app.post("/board/comment", async (req, res) => {
  const comment = await Comment.create(req.body);
  console.log(comment)
  return res.json({success: true});
})

app.delete("/board/comment", async (req, res) => {
  const id = parseInt(req.query['id']);
  const comment = await Comment.destroy({
    where: {id: id}
  })
  return res.json({board: comment});
})