Template.logoutPage.events({
    'click .goHome': function(e, tpl) {
        e.preventDefault();
        Session.clear();
        Session.clearPersistent();
        Session.clearTemp();
        Router.go('/');
    }
});
