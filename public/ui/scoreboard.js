module.exports = {
    renderScoreboard: function (people) {
        var scoreboard = document.querySelector('.scoreboard');
        for (var i = 0; i < people.length; i++) {
            var person = people[i].person;
            var newTDname = document.createElement('td');
            newTDname.innerHTML = "" + person.initials;
            var newTDtime = document.createElement('td');
            newTDtime.innerHTML = person.time.minutes + ":" + person.time.seconds + ":" + person.time.milliseconds;
            var newTR = document.createElement('tr');
            newTR.appendChild(newTDname);
            newTR.appendChild(newTDtime);
            scoreboard.appendChild(newTR);
        }
    }
};
//# sourceMappingURL=scoreboard.js.map