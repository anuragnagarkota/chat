Template.profily.helpers({
    'Guy': function() {
        return Users.findOne({})
    }
});

Template.firstFooter.helpers({
    'connectedGuy': function() {
        return Session.get('selectedGuy');
    }
});

Template.firstFooter.events({
    'click .addThisGuy': function(e, tpl) {
        Session.set('connectedGuy', Session.get('selectedGuy'));
        var guyId = Users.findOne({
            username: Session.get('selectedGuy')
        })._id;
        var currentUserId = Session.get('currentUserId');
        Meteor.call('addToConnects', guyId, currentUserId, function(error, result) {
            if (error) {
                console.log(error.reason);
                return;
            }
        });
    }
});

Template.thirdFooter.helpers({
    'currentUser': function() {
        return Session.get('currentUser');
    }
});

Template.thirdFooter.events({
    'click .logout': function(e, tpl) {
        Session.clearPersistent();
        Session.clearTemp();
        Router.go('/logout');
    },
});
