const User = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
// const mongoose = require('mongoose');

exports.login = (req, res, next) => {
    const cred = {
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone
    };

    let loadedUser;
    User.findOne({$or:[{email : cred.email}, {phone : cred.phone}]}).then( user => {
        if(!user){
            const error = new Error('This User cannot be found');
            error.statusCode = 404;
            throw error;
        }
        loadedUser = user;    
        
        return bcrypt.compare(cred.password, user.password);
    }).then(match => {
        if(!match){
            const error = new Error('Validation Failed!!')
            error.statusCode = 401;
            throw error;
        }
        //jsonWebToken Generation

        const token = jwt.sign({email: loadedUser.email, userId : loadedUser._id.toString()}, process.env.KEY, {expiresIn: '24h'});
       
        res.status(200).json({
            token : token,
            userId : loadedUser._id.toString()
          
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
    
        next(err);
    });
};

exports.signup =  (req, res, next) => { 
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation Failed!!!!!!');
        error.statusCode = 422;
        error.data = errors.array;
        throw error;
    }
    
    const cred = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        gender : req.body.gender,
        pw : req.body.password,
        place : req.body.place,
        lat: req.body.lat,
        lon: req.body.lon,
        dateTime:req.body.dateTime
    }
    // console.log(cred)
    bcrypt.hash(cred.pw, 12).then(password => {
        const user = new User({
            name: cred.name,
            email: cred.email,
            phone:cred.phone,
            gender:cred.gender,
            password: password,
            "location.name":cred.place,
            "location.coordinates" : [cred.lon, cred.lat],
            "location.dateTime" : cred.dateTime
        });
       return user.save();
    }).then(user => {
        res.status(201).json({
            user : user
        });
    }).catch(err => {
        if (!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};


