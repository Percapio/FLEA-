var fb = require('firebase'), fetch = require('fetch').fetchUrl;
//*** Config Firebase */
// Please don't steal my ID
var config = {
    apiKey: "AIzaSyAEHSPRcDAzru_95S8TAqMLLRYkU-pkZMM",
    authDomain: "gate-is-down.firebaseapp.com",
    databaseURL: "https://gate-is-down.firebaseio.com",
    projectId: "gate-is-down",
    storageBucket: "",
    messagingSenderId: "923810443103"
};
/* temporarily removed */
//*** Initialize Firebase */
var firebase = fb.initializeApp(config), db = firebase.database();
// userId = fb.auth().currentUser.uid;
module.exports = {
    checkAndReturn: function (seperateData, makeBoard, music) {
        var getHackers = db.ref().child('hackers');
        getHackers.once('value')
            .then(function (data) {
            seperateData(data.val());
            makeBoard();
            music.play();
        })["catch"](function (error) { return console.log(error); });
    },
    grabScores: function (level, renderScoreboard) {
        var people = db.ref().child(level.toString());
        people.once('value')
            .then(function (data) {
            var topThree = grabTopThree(Object.values(data.val()));
            var orderedThree = orderTopThree(topThree);
            renderScoreboard(orderedThree);
        })["catch"](function (error) { return console.log(error); });
    },
    userPosition: function () {
        console.log('last place');
    },
    makeScore: function (data, level) {
        db.ref().child(level).push({ person: data });
    }
};
var orderTopThree = function (people) {
    for (var i = 0; i < 2; i++) {
        var personA = people[i];
        for (var j = 1; j < 3; j++) {
            var personB = people[j];
            if (personA.time.seconds > personB.time.seconds) {
                var tradePerson = personA;
                personA = personB;
                personB = tradePerson;
            }
            else if (personA.time.milliseconds > personB.time.milliseconds && personA.time.seconds === personB.time.seconds) {
                var tradePerson = personA;
                personA = personB;
                personB = tradePerson;
            }
            people[i] = personA;
            people[j] = personB;
        }
    }
    return people;
};
var grabTopThree = function (people) {
    var results = [];
    for (var j = 0; j < people.length; j++) {
        var person = people[j].person;
        if (results.length < 3) {
            results.push(person);
        }
        else {
            var seconds = person.time.seconds, milliseconds = person.time.milliseconds;
            for (var i = 0; i < 3; i++) {
                if (seconds < results[i].person.time.seconds) {
                    results = results.splice(i, 1, person);
                }
                else if (milliseconds < results[i].person.time.seconds && seconds === results[i].person.time.seconds) {
                    results = results.splice(i, 1, person);
                }
            }
        }
    }
    return results;
};
var grabData = function () {
    fetch('https://cdn.rawgit.com/MISP/misp-galaxy/master/clusters/threat-actor.json', function (error, meta, body) {
        var data = JSON.parse(body.toString()).values;
        var actorId = 0;
        var webId = 0;
        var webArray = [];
        var actorArray = [];
        var _loop_1 = function (i) {
            var websites = data[i].meta.refs;
            var country = data[i].meta.country || 'unknown';
            var actorObject = void 0;
            if (typeof websites != 'undefined') {
                var checker_1 = false;
                actorObject = {
                    id: actorId,
                    name: data[i].value,
                    country: country
                };
                websites.forEach(function (website) {
                    var webObject;
                    if (typeof website != 'undefined') {
                        webObject = {
                            id: webId,
                            url: website,
                            actor: actorId
                        };
                        webArray.push(webObject);
                        webId += 1;
                        checker_1 = true;
                    }
                });
                if (checker_1) {
                    actorArray.push(actorObject);
                    actorId += 1;
                }
            }
        };
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
        db.ref().child('websites').set(webArray);
        db.ref().child('hackers').set(actorArray);
    });
};
//# sourceMappingURL=controllers.js.map