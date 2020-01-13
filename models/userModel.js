const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    phone  :{
        type : String, 
        required: true
    },
    name  :{
        type : String, 
        required: true  
    },
    email  : {
        type : String, 
        required: true
    },
    gender  :{
        type : String,  
        enum : ['Male', 'Female', 'Others'],
        required: true
    },
    password  :{
        type : String, 
        required: true
    },
    team  :[
        {
            userId : {type: Schema.Types.ObjectId, ref : 'User'},
            youAre : {type: String, enum : ['Father', 'Mother', 'Brother', 'Sister', 'Cousin', 'Nephew', 'Niece', 'Uncle', 'Aunty', 'Grand Father', 'Grand Mother', 'Grand Son', 'Grand Daughter', 'Husband', 'Wife', 'Boss', 'Employee', 'Friend', 'Mentor', 'Others', ], required : true},
            personIs : {type: String, enum : ['Father', 'Mother', 'Brother', 'Sister', 'Cousin', 'Nephew', 'Niece', 'Uncle', 'Aunty', 'Grand Father', 'Grand Mother', 'Grand Son', 'Grand Daughter', 'Husband', 'Wife', 'Boss', 'Employee', 'Friend', 'Mentor', 'Others', ], required : true},
        }
    ],
    connection :{
        sent : [
            {
                userId : {type: Schema.Types.ObjectId, ref : 'User'},
                youAre : {type: String, enum : ['Father', 'Mother', 'Brother', 'Sister', 'Cousin', 'Nephew', 'Niece', 'Uncle', 'Aunty', 'Grand Father', 'Grand Mother', 'Grand Son', 'Grand Daughter', 'Husband', 'Wife', 'Boss', 'Employee', 'Friend', 'Mentor', 'Others', ], required : true},
                personIs : {type: String, enum : ['Father', 'Mother', 'Brother', 'Sister', 'Cousin', 'Nephew', 'Niece', 'Uncle', 'Aunty', 'Grand Father', 'Grand Mother', 'Grand Son', 'Grand Daughter', 'Husband', 'Wife', 'Boss', 'Employee', 'Friend', 'Mentor', 'Son', 'Daughter', 'Others', ], required : true},
            }
        ], 
        recieved: [
            {
                userId : {type: Schema.Types.ObjectId, ref : 'User'},
                youAre : {type: String, enum : ['Father', 'Mother', 'Brother', 'Sister', 'Cousin', 'Nephew', 'Niece', 'Uncle', 'Aunty', 'Grand Father', 'Grand Mother', 'Grand Son', 'Grand Daughter', 'Husband', 'Wife', 'Boss', 'Employee', 'Friend', 'Mentor', 'Others', ], required : true},
                personIs : {type: String, enum : ['Father', 'Mother', 'Brother', 'Sister', 'Cousin', 'Nephew', 'Niece', 'Uncle', 'Aunty', 'Grand Father', 'Grand Mother', 'Grand Son', 'Grand Daughter', 'Husband', 'Wife', 'Boss', 'Employee', 'Friend', 'Mentor', 'Others', ], required : true},
            }
        ]
    },
    location:
        {
            type : {
                type: String,
                enum : ["Point"],
            },
            coordinates : {
                type:  [Number],
                required : true
            },
            name : {
                type : String,
                require : true
            },
            dateTime : {
                type : String,
                require : true
            }
            
        }
    
});

module.exports = mongoose.model('User', UserSchema);