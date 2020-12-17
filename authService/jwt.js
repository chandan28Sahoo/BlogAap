const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    let token = req.headers.cookie;
    // console.log(token);
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, result) => {
            if (err) {
                res.send(err);
            }
            // console.log(result);
            next(result);
        });
    } else {
        res.send("login please !!");
    }
}

module.exports = verify;