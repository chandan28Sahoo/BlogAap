const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("hello");
});

// user
const user_route = require("./routes/users");
app.use(user_route);
// blog
const user_blog_route = require("./routes/blog");
app.use(user_blog_route);
// like dislike comment
const like_route = require("./routes/like_dislike_comment");
app.use(like_route);

app.listen(port, () => {
    console.log(`port is running on port ${port}`);
});