const User = require('../models/user');


exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(`Error getting users`, err);
        res.status(500).json({
            error: err
        });
    }
};

