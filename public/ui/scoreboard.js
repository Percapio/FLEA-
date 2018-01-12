module.exports = {
    renderScoreboard: function (people) {
        var scoreboard = document.querySelector('.scoreboard');
        for (var i = 0; i < 3; i++) {
            var newLi = document.createElement('li');
            var person = people[i];
            var score = person.initials + ":: " + person.time.seconds + ":" + person.time.milliseconds;
            var newContent = document.createTextNode(score);
            newLi.appendChild(newContent);
            newContent.appendChild(newLi);
        }
    }
};
//# sourceMappingURL=scoreboard.js.map