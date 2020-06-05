const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports.index = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

module.exports.store = async (req, res) => {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const saveUser = await user.save();
        res.json({ 'msg': 'user created!', 'data': user});

    } catch (err) {
        res.json({ 'err': err });
    };
};

module.exports.show = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.json({ 'data': user });
    } catch {
        res.json({ 'err': 'User does not exist!' });
    }
};

module.exports.update = async (req, res) => {
    const id = req.params.id;
    let hashedPassword = undefined;
    if (req.body.password) {
        hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
    }
        let user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }
    try {
        user = await User.findByIdAndUpdate(id, user, { omitUndefined: true, new: true });
        res.json({ 'msg': 'updated success!', 'data': user });
    } catch {
        res.json({ 'err': 'User does not exist!' });
    }
};

module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndRemove(id);
        res.json({ 'msg': 'deleted success!', 'data': user });
    } catch {
        res.json({ 'err': 'User does not exist!' })
    }
};