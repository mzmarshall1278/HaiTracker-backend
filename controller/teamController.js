const User = require('../models/userModel')


exports.getTeam =(req, res, next) => {
    const userId = req.params.userId;
    const page = req.query.page || 1;

    User.findById(userId).populate('team.userId').then( user => {
        res.status(200).json({
           // msg : "Alhamdulillah",
            user : user
        });
    })


    // User.find({team : {$elemMatch : {userID}}}).then(users => {
    //     if(!users){
    //         const error = new Error('No Users Found!');
    //         error.statusCode = 404;
    //         throw error;
    //     };

    //     res.status(200).json({
    //         users : users
    //     });
    // });
}

exports.sendRequest = (req, res, next) => {
    const userId = req.query.userId;
    const searchedUser = req.body.searchedUser;
    const youAre = req.body.youAre;
    const personIs = req.body.personIs; 
    let theFoundUser;
   
    User.findOne({email : searchedUser}).then(foundUser => {
        if(!foundUser){
            const error = new Error('This user was not found.');
            error.statusCode = 404;
            throw error;
        }
        theFoundUser = foundUser;

        return User.findById(userId);
    }).then(user => {
        if(!user){
            const error = new Error('You\'re not Authenticated.');
            error.statusCode = 401;
            throw error;
        };
        
        //console.log(theFoundUser._id)
            let member =  user.team.filter( usr => usr.userId.toString() == theFoundUser._id).toString();  
            let sent = user.connection.sent.filter(usr => usr.userId.toString() == theFoundUser._id.toString());
            let recieved =  user.connection.recieved.filter(usr => usr.userId.toString() === theFoundUser._id.toString());

            

            if(member[0]){
                console.log('member')
                const error = new Error('This User is already in your team');
                error.statusCode = 405;
                throw error;
            }

            if(sent[0]){
                console.log('sent')
                const error = new Error('You have already sent a request to this person');
                error.statusCode = 405;
                throw error;
            }

            if(recieved[0]){
                console.log('recieved')
                const error = new Error('This User has already sent you a request');
                error.statusCode = 405;
                throw error;
            }

            
            
            return User.updateOne({email: searchedUser}, {$addToSet: {"connection.recieved" : [{userId: userId, youAre : personIs, personIs : youAre}]}});
    }).then(rr => {
        return User.updateOne({_id : userId}, {$addToSet: {"connection.sent" : [{userId: theFoundUser._id, youAre : youAre, personIs : personIs}]}});
    }).then(rrr => {
        res.status(201).json({
            msg : "Alhamdulillah", 
            result : "Request was successfully made"
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

//gets  the list of users that sent a request to a particuar user
exports.getSentRequests = (req, res, next) => {
    const userId = req.params.userId;
    

    User.findById(userId).populate('connection.sent.userId').then(user => {
        if(!user.connection.sent){
            const error = new Error('You haven\'t no pending requests.');
                error.statusCode = 404;
                throw error;
        };

        res.status(200).json({
            result : user.connection.sent
        });


    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

//gets  the list of users that recieved a request from a particular user
exports.getRecievedRequests = (req, res, next) => {
    const userId = req.params.userId;
    // console.log(userId)
    

    User.findById(userId).populate('connection.recieved.userId').then(user => {
        if(!user.connection.recieved){
            const error = new Error('You have no request');
                error.statusCode = 404;
                throw error;
        };

        res.status(200).json({
            result : user.connection.recieved
        });


    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};
//  {"$pull" : {"connection.sent" : {"userId" : interestedUser}, "connection.recieved" : {"userId" : interestedUser}}}
exports.cancelRequest = (req, res, next) => {
    const userId = req.params.userId;
    const interestedUser = req.body.id;
    //personIs = req.body.personIs;

    User.updateOne({_id : userId}, {"$pull" : {"connection.sent" : {"userId" : interestedUser}}}).then(r => {
        return User.updateOne({_id : interestedUser}, {"$pull" : {"connection.recieved" : {"userId" : userId}}});
    }).then(rr => {
        res.status(201).json({result : "You have successfully canceled the request"});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
    
}

exports.acceptRequest = (req, res, next) => {
    const userId = req.params.userId;
    const interestedUser = req.body.id;
    const youAre = req.body.youAre;
    personIs = req.body.personIs;
    
    User.updateOne({_id : userId}, {"$pull" : {"connection.recieved" : {"userId" : interestedUser}}, "$addToSet" : {"team" : [{"userId" : interestedUser, "youAre" : youAre, "personIs" : personIs}]}}).then(r => {
        return User.updateOne({_id : interestedUser}, {"$pull" : {"connection.sent" : {"userId" : userId}}, "$addToSet" : {"team" : [{"userId" : userId, "youAre" : personIs, "personIs" : youAre}]}});
    }).then(rr => {
        res.status(201).json({result : "You have declined the request"});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
    

}

exports.declineRequest = (req, res, next) => {
    const userId = req.params.userId;
    const interestedUser = req.body.id;
   // personIs = req.body.personIs;
    
    User.updateOne({_id : userId}, {"$pull" : {"connection.recieved" : {"userId" : interestedUser}}}).then(r => {
        return User.updateOne({_id : interestedUser}, {"$pull" : {"connection.sent" : {"userId" : userId}}});
    }).then(rr => {
        res.status(201).json({result : "You have declined the request"});
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

