const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password.toString();

    const user = await User.findOne({ email: req.body.email });

    // check if the email exists
    if (!user) return res.status(400).json({ 'err': 'User does not exists!'});

    // password is correct
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass) return res.status(400).json({ 'err': 'Wrong password!'});

    // Create and assign a token
    const token = jwt.sign({_id: user.id}, process.env.TOKEN_SECRET);

    res.header('Authorization', token).json({ 'msg': 'logged in!', 'token': token});

};