import MovingObject from './moving_objects';

class Player extends MovingObject {
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

	update() {
		window.onkeydown = (event) => {
			let keypress = event.key;

			if (keypress === ' ') {
				this.x += 10;
			}
		}
	}
}

export default Player;