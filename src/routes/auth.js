const express = require('express');
const { registerValidator } = require('../validator/auth');
const router = express.Router();
const User = require('./../models/user');
const { date } = require('./../utils/genDate');
const { hash } = require('./../utils/genHash');
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

module.exports = router;
