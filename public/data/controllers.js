var fb = require('firebase'), fetchUrl = require('fetch');
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
            var arrayOfPeeps = Object.values(data.val());
            var sortedPeople = mergeSort(arrayOfPeeps);
            var topFive = topFivePeople(sortedPeople);
            renderScoreboard(topFive);
        })["catch"](function (error) { return console.log(error); });
    },
    userPosition: function () {
        console.log('last place');
    },
    makeScore: function (data, level) {
        db.ref().child(level).push({ person: data });
    }
};
var mergeSort = function (people) {
    if (people.length === 1) {
        return people;
    }
    var midIdx = Math.floor(people.length / 2);
    var midPerson = people[midIdx];
    var mergeLeftPeople = people.slice(0, midIdx);
    var left = mergeSort(mergeLeftPeople);
    var mergeRightPeople = people.slice(midIdx);
    var right = mergeSort(mergeRightPeople);
    var sortedPeople = merge(left, right);
    return sortedPeople;
};
var merge = function (left, right) {
    var sortedPeople = [];
    if (typeof left === 'undefined') {
        return right;
    }
    else if (typeof right === 'undefined') {
        return left;
    }
    while (left.length > 0 && right.length > 0) {
        var personA = left[0].person;
        var personB = right[0].person;
        if (personA.time.seconds > personB.time.seconds) {
            sortedPeople.push(left.shift());
        }
        else if (personA.time.seconds === personB.time.seconds) {
            if (personA.time.milliseconds > personB.time.milliseconds) {
                sortedPeople.push(left.shift());
            }
        }
        else {
            sortedPeople.push(right.shift());
        }
    }
    sortedPeople = sortedPeople.concat(left, right);
    return sortedPeople;
};
var topFivePeople = function (people) {
    return people.slice(0, 4);
};
var grabData = function () {
    fetchUrl.fetchUrl('https://cdn.rawgit.com/MISP/misp-galaxy/master/clusters/threat-actor.json', function (error, meta, body) {
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