const User = require('../models/user');


exports.signup = (req, res, next) => {

    const { name, email, password } = req.body;

    const user = new User(req.body);
    
    console.log(user);



    // try {
    //     User.findOne({email}).exec((err, user) => {
    //         if (user) {
    //             return res.status(400).json({
    //                 error: 'Email already exists'
    //             });
    //         }
    //     })
    //     await user.save();
    //     const token = await user.generateAuthToken();
    //     res.status(201).json({
    //         status: 'success',
    //         token: token,
    //         data: {
    //             user: user
    //         }
    //     });
    // } catch (err) {
    //     res.status(400).json({
    //         status: 'fail',
    //         message: err
    //     });
    // }
};



