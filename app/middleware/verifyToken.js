const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = function (req, res, next) {
    let token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access denied. No token provided.');
    
    // bearer token
    const bearer = token.split(' ');
    const bearerToken = bearer[1];
    token = bearerToken;

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err) return res.status(401).send('Unauthorized.');
        req.user = decoded;
        next();
    });

}

