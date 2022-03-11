const User = require('../models/user');
const jwt = require('jsonwebtoken');


// exports.signup = (req, res) => {

//     const { name, email, password } = req.body;

//     const user = new User(req.body);
    
//     User.findOne({ email }).exec((err, user) => {
//         if (user) {
//             return res.status(400).json({
//                 error: 'Email already exists'
//             });
//         }
//     });

//     let newUser = new User({ name, email, password });

//     newUser.save((err, user) => {
//         if (err) {
//             console.log(`Sign up error`, err)
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         user.salt = undefined;
//         user.hashed_password = undefined;
//         res.json({ message: 'Sign up success! Please signin' });
//     });
// };





// controllers/auth
 
// rest of your code
const { sendEmailWithNodemailer } = require("../helpers/email");
 
exports.signup = (req, res) => {
  const { name, email, password } = req.body;
 
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
 
    const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        { expiresIn: "10m" }
    )


    const emailData = {
      from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
      subject: `ACCOUNT ACTIVATION LINK`,
      html: `
                <h1>Please use the following link to activate your account</h1>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may contain sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
    };
 
    sendEmailWithNodemailer(req, res, emailData, message='to activate your account.');
 
    // const emailData = {
    //   from: process.env.EMAIL_FROM,
    //   to: email,
    //   subject: `Account activation link`,
    //   html: `
    //             <h1>Please use the following link to activate your account</h1>
    //             <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
    //             <hr />
    //             <p>This email may contain sensetive information</p>
    //             <p>${process.env.CLIENT_URL}</p>
    //         `,
    // };
 
    // sgMail
    //   .send(emailData)
    //   .then((sent) => {
    //     // console.log('SIGNUP EMAIL SENT', sent)
    //     return res.json({
    //       message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
    //     });
    //   })
    //   .catch((err) => {
    //     // console.log('SIGNUP EMAIL SENT ERROR', err)
    //     return res.json({
    //       message: err.message,
    //     });
    //   });
  });
};



exports.accountActivation = (req, res) => {
    const {token} = req.body;
  
    if(token) {
      jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
        if(err) {
          console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err)
          return res.status(401).json({
            error: `Expired link. Signup again`
          })
        }
  
        const {name, email, password} = jwt.decode(token);
  
        const user = new User({name, email, password});
        user.save((err, user) => {
          if(err) {
            console.log('ACCOUNT ACTIVATION SAVE ERROR', err)
            return res.status(401).json({
              error: `Error saving user data. Please try again`
            })
          }
          return res.json({
            message: 'Activation success! Please signin.'
          })
        });
      });
    } else {
      return res.json({
        message: 'Something went wrong. Try again'
      })
    }
  };



  exports.signin = (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ email }).exec((err, user) => {
      if(err || !user) {
        return res.status(400).json({
          error: `User with that email does not exist. Please signup.`
        })
      }
  
      // authenticate
      if(!user.authenticate(password)) {
        return res.status(400).json({
          error: `Email and password do not match` 
        })
      }
  
      // generate a token and send to client
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      const { _id, name, email, role } = user;
  
      return res.json({
        token,
        user: { _id, name, email, role }
      })
    });
  }