Template.firstHeader.helpers({
    'currentUser': function() {
        return Session.get('currentUser');
    },
});

Template.connects.helpers({
    Connects: function() {
        return Users.findOne({
            _id: Session.get('currentUserId')
        }).connects;
    },
    'currentUser': function() {
        return Session.get('currentUser');
    },
});

Template.firstLayout.events({
    'click .filterUser': function(e, tpl) {
        e.preventDefault();
        Router.go('/secondLayout');
        Session.set('isLoaded', 0);
    },
    'click .aboutMe': function(e, tpl) {
        e.preventDefault();
        Session.setPersistent('selectedGuy', Session.get('currentUser'));
        Router.go('/about/' + Session.get('currentUser'));
        // Session.set('isLoaded', 0);
    },
    'click .searchUser': function(e, tpl) {
        e.preventDefault();
        Router.go('/searchUser');
        Session.set('isLoaded', 0);
    }
});

Template.connects.events({
    'click .remove': function() {
        Meteor.call('removeConnect', Session.get('currentUserId'), this._id);
    },
    'click .connectName': function() {
        Session.setPersistent('connectedGuy', this.username);
        Router.go('/connects/' + Session.get('connectedGuy'));
    }
});


Template.firstLayout.helpers({
    'isLoaded': function() {
        return (Session.get('isLoaded') === 1);
    }
});
