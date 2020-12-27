const jwt = require('jsonwebtoken');

module.exports.authenToken = (req, res, next) => {
    const authenHeader = req.headers['authorization'];
    const token = authenHeader && authenHeader.split(' ')[1]
    if (token == undefined) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}