import Gate from './gate';
import Timer from './timer';

export default class GameView {
	constructor(width, height, ctx, ctxUI, stars, pause, player) {
		this.width = width;
		this.height = height;
		this.ctx = ctx;
		this.stars = stars;

		this.gate = new Gate ( width, height, ctx, pause, player );
    this.timer = new Timer( width, 50, ctxUI, pause );
	}

	// Background & Backdrop
	render(origin, endGame) {
		this.ctx.beginPath();
		this.ctx.fillStyle = 'black';
		this.ctx.rect(0, 0, this.width, this.height);
		this.ctx.fill();
		this.ctx.closePath();
		
		for (let i=0; i < this.stars.length; i++) {
			this.stars[i].show(this.ctx);
		}

		this.gate.update();
		this.timer.update();
	}
}