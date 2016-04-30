Template.fifthLayout.onRendered(function() {
    Meteor.typeahead.inject();
    Meteor.call('bringEmails', Session.get('currentUserId'), function(error, result) {
        if (error) {
            console.log(error.reason);
            return;
        } else {
            var emails = result.map(function(it) {
                return {
                    value: it.email,
                    id: it._id
                };
            });
            Session.setPersistent('emails', emails);
        }
    });
});

Template.fifthLayout.helpers({
    emails: function() {
        return Session.get('emails');
    },
});

Template.fourthHeader.events({
    'click .back': function(e, tpl) {
        e.preventDefault();
        history.back();
    },
    'click .findThisGuy': function(e, tpl) {
        var searchVal = $('.typeahead.tt-input').val();
        var trimmedVal = searchVal.trim();
        if (trimmedVal !== null && trimmedVal !== "" && trimmedVal !== " ") {
            if (Session.get('currentUserId') !== null) {
                e.stopPropagation();
                var emailId = $('.typeahead.tt-input').val();
                Meteor.call('findGuy', emailId, function(error, result) {
                    if (error) {
                        console.log(error.reason);
                        return;
                    } else {
                        Session.set('selectedCity', result[0]);
                        Session.set('selectedDep', result[1]);
                        Session.set('selectedGuy', result[2]);
                        Router.go('/city/' + Session.get('selectedCity') + '/dep/' + Session.get('selectedDep') + '/people/' + Session.get('selectedGuy'));
                    }
                });
                $('.input-search').val("");
                return false;
            }
        } else
            return false
    }
});
