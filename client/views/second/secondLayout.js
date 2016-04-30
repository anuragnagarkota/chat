Template.secondHeader.helpers({
    'field': function() {
        return Session.get('field');
    },
    'icon': function() {
        return Session.get('icon');
    }
});

Template.secondHeader.events({
    'click .back': function(e, tpl) {
        e.preventDefault();
        history.back();
    }
});

Template.cities.helpers({
    Cities: function() {
        return All.find({}).fetch().map(function(x) {
            return x.city;
        })
    },
});

Template.cities.events({
    'click .selectCity': function(e, tpl) {
        Session.setPersistent('selectedCity', this.toString());
        Router.go('/city/' + this);
    }
});

Template.deps.helpers({
    Deps: function() {
        return All.find({
            'city': Session.get('selectedCity')
        }, {
            fields: {
                'deps': 1
            }
        }).fetch().map(function(x) {
            return x.deps;
        });

    },
    'selectedCity': function() {
        return Session.get('selectedCity');
    }
});

Template.deps.events({
    'click .selectDep': function(e, tpl) {
        Session.setPersistent('selectedDep', this.toString());
        Router.go('/city/' + Session.get('selectedCity') + '/dep/' + this);
    }
});

Template.people.helpers({
    People: function() {
        var selectedCity = Session.get('selectedCity');
        var selectedDep = Session.get('selectedDep');
        var currentUserId = Session.get('currentUserId');
        Meteor.call('peopleList', selectedCity, selectedDep, currentUserId, function(error, result) {
            if (error) {
                console.log(error.reason);
                return;
            } else {
                Session.setPersistent("peopleList", result)
            }
        });
        return Session.get("peopleList");
    }
});

Template.people.events({
    'click .selectGuy': function(e, tpl) {
        Session.setPersistent('selectedGuy', this.toString());
        Router.go('/city/' + Session.get('selectedCity') + '/dep/' + Session.get('selectedDep') + '/people/' + this);
    }
});
