const mongoose = require('mongoose');
const { dateRegexValidator } = require('./../utils/regex');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique: true,
    },
    bornDate: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return dateRegexValidator.test(v);
            },
        },
    },
    role: {
        type: String,
        default: 'customer',
        required: true,
        enum: ['employee', 'employer', 'admin'],
    },
    date: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return dateRegexValidator.test(v);
            },
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024,
    },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
