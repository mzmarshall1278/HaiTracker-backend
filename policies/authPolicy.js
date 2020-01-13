const {body} = require('express-validator');
const User = require('../models/userModel');
  

module.exports = [  

    body('email').isEmail().withMessage("please enter a valid email.").custom((value, {req}) => {
        return User.findOne({email : value}).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }).normalizeEmail(),

    body('password').trim().isLength({min:8}),
    body('phone').trim().isLength({min:8}),
    body('name').trim().isLength({min:5}),
    body('gender').trim().isLength({min:4}),
];