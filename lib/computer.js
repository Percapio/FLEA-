import Util from './util';
import Game from './game';


class Computer {
	constructor(options) {
		this.pos = options.pos;
		this.radius = options.radius;
		this.vel = options.vel;
		this.vector = options.vector;
		this.game = options.game;
		debugger;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}

	update() {
		let newX = this.pos[0] + this.vel[0];
		let	newY = this.pos[1] + this.vel[1];

		if (this.game.outOfBounds(newX, newY)) {
			newX = Util.wrap(newX, Game.MAX_X);
			newY = Util.wrap(newY, Game.MAX_Y);
		}

		this.pos = [newX, newY];
		console.log(this.pos);
	}
}

export default Computer;