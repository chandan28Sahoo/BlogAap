const express = require("express");
const router = express.Router();
const users = require("../service/users");
const user = new users();
const like_dislike_comment = require("../service/like_dislike_comment");
const all_things = new like_dislike_comment();
const blogs = require("../service/blog");
const blog = new blogs();
const verify = require("../authService/jwt");

router.get("/All_likes/:user_id", verify, async(decoded, req, res, next) => {
    let userMail = await user.check_user(decoded.data.email);
    if (userMail !== undefined) {
        let data = await all_things.findAll(req.params.user_id);
        res.send(data);
        let details = {
            username: data.users.username,
            user_id: data.user_id,
            post_id: data.blog.id,
            title: data.blog.title,
            article: data.blog.article,
            like: data.like,
            dislike: data.dislike,
            comment: data.comment,
        };
        console.log(details);
    } else {
        res.send("user not found ..!");
    }
});

// do like dislike comment
router.post("/doLike/:title", verify, async(decoded, req, res, next) => {
    let { like, dislike, comment } = req.body;
    let userMail = await user.check_user(decoded.data.email);
    if (userMail !== undefined) {
        let user_id = userMail.id;
        let title = await blog.check_by_title(req.params.title);
        if (title !== undefined) {
            console.log(title.id);
            let post = title.id;
            let likes = await all_things.check_by_user_id(user_id);
            console.log(likes.id);
            console.log(likes.post_id, " ", post_id);
            let data = {
                post_id: title.id,
                user_id: userMail.id,
                like: like,
                dislike: dislike,
                comment: comment,
            };
            if (likes !== undefined) {
                await all_things.updateById(likes.id, data);
                res.send("successfully update");
            } else {
                await all_things.create_like(data);
                res.send("successfully insert");
            }
        } else {
            res.send("post not found");
        }
    } else {
        res.send("user not found ..!");
    }
});
module.exports = router;

// vrouter.get("/likes", verify, async (decoded, req, res, next) => {
//   let userMail = await user.check_user(decoded.data.email);
//   if (userMail !== undefined) {
//     let data = await all_things.findAllLikeComments();
//     res.send(data);
//   } else {
//     res.send("user not found ..!");
//   }
// });