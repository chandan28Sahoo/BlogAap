const express = require("express");
const router = express.Router();
const users = require("../service/users");
const user = new users();
const jwt = require("jsonwebtoken");
const verify = require("../authService/jwt");

router.get("/data", async(req, res) => {
    console.log("dfghj");
    let data = await user.findAll();
    res.send(data);
});

router.post("/signup", (req, res) => {
    let { fname, lname, email, phone_no, password } = req.body;
    let username = fname + 19;
    user
        .createUsers({
            fname: fname,
            lname: lname,
            username: username,
            email: email,
            phone_no: phone_no,
            password: password,
        })
        .then((users) => {
            res.send({ success: `${email} registered successfully!` });
        })
        .catch((err) => {
            res.send({ msg: "Email already exists" });
        });
});

router.post("/login", (req, res) => {
    let { email, password } = req.body;
    user.check_user(email).then((data) => {
        if (data == undefined) {
            res.send({ sorry: `account doesn't exist!` });
        } else {
            console.log(data.password);
            if (data.password === password) {
                let token = jwt.sign({ data }, process.env.SECRET_KEY);
                res.cookie("token", token);
                res.json({
                    msg: "sucessfully logged in..",
                    token: token,
                });
            } else {
                res.send({ "wrong password": "try again " });
            }
        }
    });
});

router.put("/update", verify, async(decoded, req, res, next) => {
    let email = decoded.data.email;
    let data = await user.check_user(email);
    if (data !== undefined) {
        await user.updateByEmail(email, req.body);
        await res.send({ success: `${email} updated successfully` });
    } else {
        await res.send({ message: `${email} not found` });
    }
});

router.delete("/delete", verify, async(decoded, req, res) => {
    let name = decoded.data.name;
    let data = await user.check_by_Name(name);
    if (data !== undefined) {
        await user.deleteByName(name);
        await res.send({ success: `${name} delete successfully` });
    } else {
        await res.send({ message: `${name} not found` });
    }
});

module.exports = router;