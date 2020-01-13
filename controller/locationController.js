const User = require('../models/userModel')
const Positions = require('../models/positionsModel');

exports.getAllLocations = (req, res, next) => {

};

exports.getOneLocation = (req, res, next) => {

};

exports.updateMyLocation = (req, res, next) => {
    const userId = req.params.user;
    const coords = req.body;
    User.updateOne({_id: userId}, {"$set" : {"location.coordinates" : [coords.lon, coords.lat], "location.name": coords.address, "location.dateTime" : coords.dateTime }}).then(res => {
        res.json({msg : 'ssss'})
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
    })

};