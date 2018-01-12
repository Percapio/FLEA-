module.exports = {
    renderScoreboard: function (people) {
        var scoreboard = document.querySelector('.scoreboard');
        for (var i = 2; i > -1; i--) {
            var person = people[i];
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