const mongoose = require('mongoose');
const financialSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
    },
    basic_salary: {
        type: Number,
        required: true,
        min: 1000,
        max: 10000000000,
    },
    rewards: [
        {
            amount: {
                type: Number,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            from: {
                type: mongoose.Schema.Types.ObjectId,
            },
        },
    ],
    penalty: [
        {
            amount: {
                type: Number,
                required: true,
            },
            date: {
                type: String,
                required: true,
            },
            from: {
                type: mongoose.Schema.Types.ObjectId,
            },
        },
    ],
});

const Financial = mongoose.model('Financial', financialSchema);
module.exports = Financial;
