Meteor.methods({
    'validateUser': function(email, passkey) {
        var user = Users.findOne({
            "email": email,
            "passkey": passkey
        });
        if (typeof user !== "undefined" && user !== null) {
            return [user._id, user.username];
        }
    },
    'allConnects': function(currentUserId) {
        return Users.findOne({
            _id: currentUserId
        }).connects;
    },
    'peopleList': function(city, dep, currentUserId) {
        return _.uniq(Users.find({
            city: city,
            dep: dep,
            _id: {
                $ne: currentUserId
            }
        }, {
            fields: {
                username: true
            }
        }).fetch().map(function(x) {
            return x.username;
        }), false)
    },
    'addToConnects': function(guyId, currentUserId) {
        var username = Users.findOne({
            _id: guyId
        }).username;
        var dep = Users.findOne({
            _id: guyId
        }).dep;
        var city = Users.findOne({
            _id: guyId
        }).city;
        var email = Users.findOne({
            _id: guyId
        }).email;
        Users.update({
            _id: currentUserId
        }, {
            $addToSet: {
                connects: {
                    _id: guyId,
                    username: username,
                    email: email,
                    dep: dep,
                    city: city
                }
            }
        })
    },
    'newMessage': function(text, posterId, receiver, now) {
        var receiverId = Users.findOne({
            username: receiver
        })._id;
        var poster = Users.findOne({
            _id: posterId
        }).username;
        Messages.insert({
            text: text,
            posterId: posterId,
            poster: poster,
            receiverId: receiverId,
            timestamp: now,
            state: 'rgb(52, 168, 83)'
        });

        var username = Users.findOne({
            _id: posterId
        }).username;
        var dep = Users.findOne({
            _id: posterId
        }).dep;
        var city = Users.findOne({
            _id: posterId
        }).city;
        var email = Users.findOne({
            _id: posterId
        }).email;

        Users.update({
            _id: receiverId
        }, {
            $addToSet: {
                connects: {
                    _id: posterId,
                    username: username,
                    email: email,
                    dep: dep,
                    city: city
                }
            }
        });
    },
    'removeConnect': function(userId, connectId) {
        Users.update({
            _id: userId
        }, {
            $pull: {
                connects: {
                    _id: connectId
                }
            }
        })
    },
    'bringEmails': function(currentUserId) {
        return Users.find({
            _id: {
                $ne: currentUserId
            }
        }, {
            fields: {
                email: true
            }
        }).fetch();
    },
    'findGuy': function(emailId) {
        var output = Users.findOne({
            email: emailId
        });
        return [output.city, output.dep, output.username]
    },
    'stateUpdateToSeen': function(messageIdArray) {
        _.each(messageIdArray, function(id) {
            Messages.update({
                _id: id
            }, {
                $set: {
                    state: 'rgb(66, 133, 244)'
                }
            });
        });
    },
    'writingForUpdate': function(user1Id, user2) {
        var user2Id;
        if (user2 === "") {
            user2Id = ""
        } else {
            user2Id = Users.findOne({
                username: user2
            })._id;
        }

        Users.update({
            _id: user1Id
        }, {
            $set: {
                writingFor: user2Id
            }
        });
    }
});
