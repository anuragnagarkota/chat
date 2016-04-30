Template.fourthLayout.onRendered(function() {
    Session.set('timer', 'start');
    Tracker.autorun(function(computation) {
        if (Session.get("timer") === 'stop') {
            computation.stop();
        }
        var messageIdArray = Messages.find({
            $and: [{
                poster: Session.get('connectedGuy')
            }, {
                state: 'rgb(52, 168, 83)'
            }]
        }).fetch().map(function(x) {
            return x._id
        });
        Meteor.call('stateUpdateToSeen', messageIdArray, function(error, result) {
            if (error) {
                console.log(error.reason);
                return;
            } else {
                return;
            }
        });
    });
});

Template.fourthLayout.onDestroyed(function() {
    Session.set('timer', 'stop');
});

Template.fourthLayout.helpers({
    'isLoaded2': function() {
        return (Session.get('isLoaded2') === 1);
    }
});

Template.thirdHeader.helpers({
    'connectedGuy': function() {
        return Session.get('connectedGuy');
    },
    'currentUser': function() {
        return Session.get('currentUser');
    },
    'matched': function() {
        var writingFor = Users.findOne({
            username: Session.get('connectedGuy')
        }).writingFor;
        return (Session.get('currentUserId') === writingFor);
    }
});

Template.thirdHeader.events({
    'click .back': function(e, tpl) {
        e.preventDefault();
        Router.go('/firstLayout');
        Session.set('isLoaded2', 0);
        Meteor.call('writingForUpdate', Session.get('currentUserId'), "", function(error, result) {
            if (error) {
                console.log(error.reason);
                return;
            } else {
                return
            }
        });
    },
    'click .aboutUser': function(e, tpl) {
        e.preventDefault();
        Session.setPersistent('selectedGuy', Session.get('connectedGuy'));
        Router.go('/aboutUser/' + Session.get('connectedGuy'));
        Session.set('isLoaded2', 0);
        Meteor.call('writingForUpdate', Session.get('currentUserId'), "", function(error, result) {
            if (error) {
                console.log(error.reason);
                return;
            } else {
                return
            }
        });
    }
});

Template.messageList.onRendered(function() {
    setTimeout(function() {
        $('.messageList').animate({
            scrollTop: $(".messageList").get(0).scrollHeight
        }, 0);
    }, 10);

});

Template.messageList.helpers({
    'Messages': function() {
        return Messages.find({});
    },
    'offset1': function() {
        setTimeout(function() {
            $('.messageList').animate({
                scrollTop: $(".messageList").get(0).scrollHeight
            }, 0);
        }, 10);
        if (this.posterId === Session.get('currentUserId')) {
            return 1;
        } else {
            return 0;
        }
    },
    'offset2': function() {
        setTimeout(function() {
            $('.messageList').animate({
                scrollTop: $(".messageList").get(0).scrollHeight
            }, 0);
        }, 10);

        if (this.posterId === Session.get('currentUserId')) {
            return 4;
        } else {
            return 0;
        }
    },
    'offset3': function() {
        setTimeout(function() {
            $('.messageList').animate({
                scrollTop: $(".messageList").get(0).scrollHeight
            }, 0);
        }, 10);
        if (this.posterId === Session.get('currentUserId')) {
            return 6;
        } else {
            return 0;
        }
    },
    'message': function() {
        if (this.posterId === Session.get('currentUserId')) {
            return 'message1';
        } else {
            return 'message2';
        }
    },
    'connectedGuy': function() {
        return Session.get('connectedGuy');
    },
    'tdate': function() {
        return moment(this.timestamp).format("h:mm a, ddd, MMM Do");
    },
    'status': function() {
        return this.state;
    },
    'currentUser': function() {
        return (this.posterId === Session.get('currentUserId'))
    }
});

Template.messageList.events({
    'submit form': function(e) {
        var inputVal = $('.input-box_text').val();
        var trimmedVal = inputVal.trim();
        if (trimmedVal !== null && trimmedVal !== "" && trimmedVal !== " ") {
            if (Session.get('currentUserId') !== null) {
                e.stopPropagation();
                var text = $('.input-box_text').val();
                var poster = Session.get('currentUserId');
                var receiver = Session.get('connectedGuy')
                var now = new Date;
                Meteor.call('newMessage', text, poster, receiver, now, function(error, result) {
                    if (error) {
                        console.log(error.reason);
                        return;
                    } else {
                        $(".messageList").scrollTop($(".messageList")[0].scrollHeight);
                    }
                });
                $('.input-box_text').val("");
                Meteor.call('writingForUpdate', Session.get('currentUserId'), "", function(error, result) {
                    if (error) {
                        console.log(error.reason);
                        return;
                    } else {
                        return
                    }
                });
                return false;
            }
        } else
            return false;
    },
    'keypress input': function() {
        Meteor.call('writingForUpdate', Session.get('currentUserId'), Session.get('connectedGuy'), function(error, result) {
            if (error) {
                console.log(error.reason);
                return;
            } else {
                console.log('kuchh');
                return
            }
        });
    }
});
