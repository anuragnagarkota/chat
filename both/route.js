Router.configure({
    loadingTemplate: 'spinner'
});

Router.route('/', {
    layoutTemplate: 'loginPage',
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Router.go('/firstLayout');
        } else {
            this.render('freshPage');
        }
    }
});

Router.route('/pcc', {
    layoutTemplate: 'loginPage',
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Router.go('/firstLayout');
        } else {
            this.render('accessDenied');
        }
    }
});

Router.route('/firstLayout', {
    layoutTemplate: 'firstLayout',
    subscriptions: function() {
        this.subscribe('users', Session.get('currentUser'), function() {
            Session.set('isLoaded', 1);
        }).wait();
    },
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            this.render('connects');
        } else {
            Router.go('/');
        }
    }
});

Router.route('searchUser', function() {
    this.render('fifthLayout');
})

Router.route('/secondLayout', {
    layoutTemplate: 'secondLayout',
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Session.set('field', 'Select City');
            Session.set('icon', 'map-marker');
            Session.setPersistent('selectedCity', "");
            this.render('cities');
        } else {
            Router.go('/');
        }
    }
});

Router.route('/city/:cityName', {
    layoutTemplate: 'secondLayout',
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Session.setPersistent('field', 'Select Department');
            Session.setPersistent('selectedDep', "");
            Session.set('icon', 'industry');
            this.render('deps');
        } else {
            Router.go('/');
        }
    }
});

Router.route('/city/:cityName/dep/:depName', {
    layoutTemplate: 'secondLayout',
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Session.setPersistent('field', 'Select Your Guy');
            Session.set('icon', 'users');
            Session.setPersistent('selectedGuy', "");
            this.render('people');
        } else {
            Router.go('/');
        }
    }
});

Router.route('/city/:cityName/dep/:depName/people/:guyName', {
    layoutTemplate: 'thirdLayout',
    subscriptions: function() {
        this.subscribe('users', Session.get('selectedGuy')).wait();
    },
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Session.setPersistent('field', this.params.guyName + "'s Profile");
            Session.set('icon', 'info');
            this.render('firstFooter');
        } else {
            Router.go('/');
        }
    }
});

Router.route('/connects/:guyName', {
    layoutTemplate: 'fourthLayout',
    subscriptions: function() {
        this.subscribe('messagesAndUsers', Session.get('currentUserId'), this.params.guyName, function() {
            Session.set('isLoaded2', 1);
        }).wait();
    },
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            this.render('messageList');
        } else {
            Router.go('/');
        }
    }
});

Router.route('/about/:myName', {
    layoutTemplate: 'thirdLayout',
    subscriptions: function() {
        this.subscribe('users', this.params.myName).wait();
    },
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Session.setPersistent('field', 'Your Profile');
            Session.set('icon', 'info');
            this.render('thirdFooter');
        } else {
            Router.go('/');
        }
    }
});

Router.route('/aboutUser/:hisName', {
    layoutTemplate: 'thirdLayout',
    subscriptions: function() {
        this.subscribe('users', this.params.hisName).wait();
    },
    onBeforeAction: function() {
        if (Session.get('isLogin') === true) {
            Session.setPersistent('field', this.params.hisName + "'s Profile");
            Session.set('icon', 'info');
        } else {
            Router.go('/');
        }
    }
});

Router.route('/logout', function() {
    this.render('logoutPage');
});
