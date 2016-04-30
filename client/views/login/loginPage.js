Template.loginPage.events({
    'submit form.form-horizontal': function(e, tpl) {
        e.preventDefault();
        var email = tpl.$('input[name=email]').val();
        var passkey = tpl.$('input[name=passkey]').val();
        Session.set('isSigning', 1);
        Meteor.call('validateUser', email, passkey, function(error, result) {
            if (error) {
                console.log(error.reason);
            } else {
                if (typeof result !== "undefined" && result !== null) {
                    Session.setPersistent('isLogin', true);
                    Session.setPersistent('currentUserId', result[0]);
                    Session.setPersistent('currentUser', result[1]);
                    Router.go("/firstLayout");
                    Session.set('isSigning', 0);
                    return false;
                } else
                    Router.go("/pcc");
                Session.set('isSigning', 0);
            }
        });

        tpl.$('input[name=email]').val("");
        tpl.$('input[name=passkey]').val("");
    }
});

Template.loginPage.helpers({
    'isSigning': function() {
        return (Session.get('isSigning') === 1);
    }
})
