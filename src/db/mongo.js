const mongoose = require('mongoose');
const db = () => {
    mongoose.connect(
        process.env.URI,
        {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (err) {
                if (process.env.NODE_ENV === 'development') {
                    console.log(`database is  disconnected`);
                }
            }
        }
    );
};

module.exports = { db };
