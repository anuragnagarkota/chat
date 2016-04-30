Meteor.publish('users', function(user) {
    return Users.find({
        username: user
    }, {
        fields: {
            passkey: 0
        }
    });
});

Meteor.publish('messagesAndUsers', function(currentUserId, connectedGuy) {
    var connectedGuyId = Users.findOne({
        username: connectedGuy
    })._id;
    return [Messages.find({
        $or: [{
            posterId: currentUserId,
            receiverId: connectedGuyId
        }, {
            posterId: connectedGuyId,
            receiverId: currentUserId
        }]
    }), Users.find({
        $or: [{
            username: connectedGuy
        }, {
            _id: currentUserId
        }]
    }, {
        fields: {
            passkey: 0
        }
    })];
});


Meteor.publish('cities', function() {
    return All.find({}, {
        fields: {
            city: 1
        }
    });
});

Meteor.publish('deps', function() {
    return All.find({}, {
        fields: {
            deps: 1
        }
    });
});
