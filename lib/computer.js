import Tracking from './moving_objects';

class Computer extends Tracking {

	constructor(options) {
		super(options);
	}

	draw(ctx) {
		ctx.clearRect(0, 0, 400, 400);
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.arc(this.x, this.y, Math.PI * this.radius, 0, 0);
		ctx.fill();
	}

}

export default Computer;