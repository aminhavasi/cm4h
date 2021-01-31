const express = require('express');
const { registerValidator } = require('../validator/auth');
const router = express.Router();
const User = require('./../models/user');

router.post('/register', async (req, res) => {
    const { error } = await registerValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        res.status(200).send('ok');
    } catch (err) {
        res.status(400).send('something went wrong');
    }
});

module.exports = router;
