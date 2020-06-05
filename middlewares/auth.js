const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {
    const bearerHeader = req.header('Authorization');
    if (typeof bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        if (!bearerToken) return res.status(401).json({ 'err': 'Access Denied!' })

        try {
            const verified = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            res.status(400).json({ 'err': 'Invalid Token!' })
        }
    }
};