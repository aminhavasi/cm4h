const bcrypt = require('bcryptjs');

const hash = async (password) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hPassword = await bcrypt.hash(password, salt);

        return {
            status: 1,
            value: hPassword,
        };
    } catch (err) {
        return {
            status: 0,
        };
    }
};

const checkHash = async (password, hashPassword) => {
    try {
        let compiredPassword = await bcrypt.compare(password, hashPassword);
        return compiredPassword;
    } catch (err) {
        return false;
    }
};

module.exports = { hash, checkHash };
