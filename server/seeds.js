Meteor.startup(function() {
    var user = {
        username: "testname",
        passkey: "testkey",
        email: "test@test.com",
        connects: [],
        city: "cityName",
        dep: "depName",
        writingFor: ""
    };
    var user2 = {
        username: "testname2",
        passkey: "testkey2",
        email: "test2@test.com",
        connects: [],
        city: "cityName2",
        dep: "depName2",
        writingFor: ""
    };
    var user3 = {
        username: "Pourush",
        passkey: "ourushP",
        email: "pourush@resonance.ac.in",
        connects: [],
        city: "Kota",
        dep: "Business Strategy",
        writingFor: ""
    };
    var user4 = {
        username: "Raghav",
        passkey: "aghavR",
        email: "raghav@resonance.ac.in",
        connects: [],
        city: "Kota",
        dep: "Business Strategy",
        writingFor: ""
    };
    var user5 = {
        username: "Harshit",
        passkey: "arshitH",
        email: "harshit@resonance.ac.in",
        connects: [],
        city: "Kota",
        dep: "Business Strategy",
        writingFor: ""
    };
    var user6 = {
        username: "Anurag",
        passkey: "nuragA",
        email: "anurag@resonance.ac.in",
        connects: [],
        city: "Kota",
        dep: "Business Strategy",
        writingFor: ""
    };
    var user7 = {
        username: "Ajay",
        passkey: "jayA",
        email: "ajay@resonance.ac.in",
        connects: [],
        city: "Kota",
        dep: "Business Strategy",
        writingFor: ""
    };
    var user8 = {
        username: "testName",
        passkey: "testname",
        email: "testName@resonance.ac.in",
        connects: [],
        city: "cityName",
        dep: "depName",
        writingFor: ""
    };
    var user9 = {
        username: "Ajit",
        passkey: "jitA",
        email: "ajit@resonance.ac.in",
        connects: [],
        city: "Kota",
        dep: "Business Strategy",
        writingFor: ""
    };
    var user10 = {
        username: "Nagesh",
        passkey: "sgeshN",
        email: "nagesh@resonance.ac.in",
        connects: [],
        city: "Kota",
        dep: "Business Strategy",
        writingFor: ""
    };
    if (Users.find().count() === 0) {
        Users.insert(user);
        Users.insert(user2);
        Users.insert(user3);
        Users.insert(user4);
        Users.insert(user5);
        Users.insert(user6);
        Users.insert(user7);
        Users.insert(user8);
        Users.insert(user9);
        Users.insert(user10);
    };
    var citylist = _.uniq(Users.find({}, {
        fields: {
            city: true,
            dep: true
        }
    }).fetch().map(function(x) {
        return x.city;
    }), false);
    
    if (All.find().count() === 0) {
        _.each(citylist, function(city) {
            var deps = _.uniq(Users.find({
                'city': city
            }, {
                fields: {
                    dep: true
                }
            }).fetch().map(function(y) {
                return y.dep;
            }), false);
            All.insert({
                'city': city,
                'deps': deps
            });
        });
    };
    // All.remove({});
});
