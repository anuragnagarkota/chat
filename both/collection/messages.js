Messages= new Mongo.Collection('messages');

Messages.allow({

    insert: function(userId, doc) {
        return (Session.get('currentUser') && doc.poster === Session.get('currentUser'));
    },
    // remove: function(userId, doc) {
    //     return doc.ownerId === userId;
    // },
    // update: function(userId, doc, fields, modifier) {
    //     return doc.receiverId === Session.get('currentUserId');
    // },

});