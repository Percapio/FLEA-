var modal = document.getElementById('modal'), pause = document.getElementById('modal-content-pause'), lose = document.getElementById('modal-content-lose'), win = document.getElementById('modal-content-win');
module.exports = {
    pauseModal: function (paused, type) {
        modal.style.display = 'none';
        pause.style.display = 'none';
        lose.style.display = 'none';
        win.style.display = 'none';
        if (paused) {
            modal.style.display = 'block';
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
    }
};
//# sourceMappingURL=modal.js.map