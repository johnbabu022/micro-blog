const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(bodyParser.json());
let posts = {
  id: "12333",
  title: "johns post",
};
app.post("/post", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => console.log(err));

  res.status(200).json(posts[id]);
});

app.get("/", (req, res) => {
  res.status(200).json(posts);
});
app.post("/events", (req, res) => {
  console.log(req.body);
  res.status(200).json("event recived on post");
});

app.listen(4000, () => {
  console.log("5");
  console.log("hello world");
  console.log(posts);
  console.log("app listening to port 4000");
});

//kubectl rollout restart deployement posts-depl
