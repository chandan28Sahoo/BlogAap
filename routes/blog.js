const express = require("express");
const router = express.Router();
const blogs = require("../service/blog");
const blog = new blogs();
const users = require("../service/users");
const user = new users();
const verify = require("../authService/jwt");

router.get("/blogs", verify, async(decoded, req, res, next) => {
    console.log("dfghj");
    let userMail = await user.check_user(decoded.data.email);
    if (userMail !== undefined) {
        let data = await blog.findBlog();
        res.send(data);
    } else {
        res.send("user not found ..!");
    }
});

router.post("/addBlog", verify, async(decoded, req, res, next) => {
    let { title, article } = req.body;
    // console.log(article);
    let userMail = await user.check_user(decoded.data.email);
    // console.log(userMail.id);
    if (userMail !== undefined) {
        console.log("hello");
        let user_id = userMail.id;
        let blog_data = {
            title: title,
            article: article,
            users_id: user_id,
        };
        try {
            await blog.create_blog(blog_data);
            res.send("secuessfully add !");
        } catch (error) {
            res.send(error);
        }
    } else {
        res.send("user not found !!");
    }
});

router.get("/Title/:title", verify, async(decoded, req, res, next) => {
    let userMail = await user.check_user(decoded.data.email);
    if (userMail !== undefined) {
        console.log(userMail);
        try {
            let title = await blog.check_by_title(req.params.title);
            res.send(title);
        } catch (error) {
            res.send(error);
        }
    } else {
        res.send("user not found ..!");
    }
});

router.get("/All_blogs/:users_id", verify, async(decoded, req, res, next) => {
    let userMail = await user.check_user(decoded.data.email);
    if (userMail !== undefined) {
        let data = await blog.findAll(req.params.users_id);
        res.send(data);
        let details = {
            username: data.users.username,
            user_id: data.user_id,
            post_id: data.id,
            title: data.title,
            article: data.article,
        };
        res.send(details);
        console.log(details);
    } else {
        res.send("user not found ..!");
    }
});
module.exports = router;