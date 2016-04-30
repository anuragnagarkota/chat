Meteor.methods({
    'allConnects': function(currentUserId) {
        return Users.findOne({
            _id: currentUserId
        }).connects;
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
            state: 'rgb(251, 188, 5)'
        });
    },
    // 'cityList': function() {
    //     // console.log('citylist');
    //     // console.log(All.find().fetch()[0]);
    //     var y = All.find().fetch().map(function(x) {
    //         return x.city
    //     });
    //     return y;
    // }
    // 'deps': function(city) {
    //     return All.find({
    //         'city': city
    //     }, {
    //         fields: {
    //             'deps': 1
    //         }
    //     }).fetch().map(function(x) {
    //         return x.deps;
    //     });
    // }
});
