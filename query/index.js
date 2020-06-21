const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", async (req, res) => res.send(posts));

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  switch (type) {
    case "PostCreated":
      const { id, title } = data;
      posts[id] = {
        id,
        title,
        comments: [],
      };

      break;
    case "CommentCreated":
      const { content, postId, id: commentId } = data;

      posts[postId] = {
        ...posts[postId],
        comments: [...posts[postId].comments, { content, id: commentId }],
      };

      break;
  }

  res.send({ status: "OK" });
});

app.listen(4002, () => {
  console.log("listening on 4002");
});
