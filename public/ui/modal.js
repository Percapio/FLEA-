var modal = document.getElementById('modal'), btn = document.getElementById('open'), shut = document.getElementsByClassName('close'), pause = document.getElementsByClassName('pause'), lose = document.getElementsByClassName('lose'), win = document.getElementsByClassName('win');
module.exports = {
    pauseModal: function (paused, type) {
        if (paused) {
            modal.style.display = 'block';
        }
        else {
            modal.style.display = 'none';
            pause.style.display = 'none';
            lose.style.display = 'none';
            win.style.display = 'none';
            return;
        }
        switch (type) {
            case 'player':
                pause.style.display = 'block';
                break;
            case 'lose':
                lose.style.display = 'block';
                break;
            case 'win':
                win.style.display = 'block';
                break;
            default:
                return;
        }
    }
};
//# sourceMappingURL=modal.js.map