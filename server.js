const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.static("static"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
let userList = [];

app.post("/addUser", (req, res) => {
  const nick = req.body.login;
  if (userList.length < 2) {
    if (!userList.includes(nick)) {
      userList.push(nick);
      if (userList.length == 1) {
        res.end(JSON.stringify({ name: req.body.login, position: 1 }));
      } else if (userList.length == 2) {
        res.end(
          JSON.stringify({ name: nick, position: 2, enemy: userList[0] })
        );
      }
    } else {
      res.end(JSON.stringify({ name: "exist" }));
    }
  } else {
    res.end(JSON.stringify({ name: "inGame" }));
  }
});
app.post("/waiting", (req, res) => {
  if (userList.length == 2) {
    res.end(JSON.stringify({ id: 2, enemy: userList[1] }));
  }
});
app.post("/reset", (req, res) => {
  userList = [];
});

let pionki = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
];
let move = 1;
let xstart = null;
let zstart = null;
let xend = null;
let zend = null;
let isPlay = false;
app.post("/updateTable", (req, res) => {
  const { xs, zs, xe, ze, user } = req.body;
  xstart = xs;
  zstart = zs;
  xend = xe;
  zend = ze;
  move = user == 1 ? 2 : 1;
  isPlay = true;
});
app.post("/compareTable", (req, res) => {
  if (isPlay) {
    res.end(JSON.stringify({ xstart, zstart, xend, zend, move, info: "ok" }));
  } else {
    res.end(JSON.stringify({ info: "nie ok" }));
  }
});
app.listen(PORT, () => {
  console.log("start servera");
});
