const express = require('express');
const { registerValidator, loginValidator } = require('../validator/auth');
const router = express.Router();
const User = require('./../models/user');
const { date } = require('./../utils/genDate');
const { hash, checkHash } = require('./../utils/genHash');
const { genToken } = require('./../core/jwt');
router.post('/register', async (req, res) => {
    const { error } = await registerValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        req.body.date = date;
        let statusHash = await hash(req.body.password);
        if (statusHash.status === 0) {
            throw new Error('password hasing had some problem ');
        }
        req.body.password = statusHash.value;
        let newUser = await new User(req.body);
        await newUser.save();
        res.status(200).send('registration was successfully completed!');
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});

router.post('/login', async (req, res) => {
    const { error } = await loginValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(404).send('email or password is incorrect');
        let passwordMatch = await checkHash(req.body.password, user.password);
        if (!passwordMatch === true) {
            return res.status(404).send('email or password is incorrect');
        }
        const token = await genToken(user._id, user.role);
        res.status(200).send(token);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
