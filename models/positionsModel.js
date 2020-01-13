const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
         required : true 
    },
    location : {
        type : {
            type: String,
            enum : ["Point"],
            required : true
        },
        coordinates : {
            type:  [Number],
            required : true
        },
        description : {
            type : String,
             required : true 
        },
    },
    date : {
        type : Date,
        required : true
    },
    
});

module.exports = mongoose.model('Position', PositionSchema);