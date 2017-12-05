import Tracking from './moving_objects';

class Computer extends Tracking {
	constructor(options) {
		super(options);
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'red';
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();
	}

	update(x, y) {
		x++;
		y++;

		return [x, y];
	}
}

export default Computer;