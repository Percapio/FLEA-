import MovingObject from './moving_object';

export default class Player extends MovingObject {
	constructor(width, height, ctx, origin, thrusters, turns) {
		super(width, height, ctx);
		this.origin = origin;

		this.radius = 5;
		this.rotation = 0;

		this.vel = [ 0, 0 ];
		this.thrusters = thrusters;

		this.head = this.drawSide(0);
	}

	move(thrusters, banking) {
		window.onkeydown = (e) => {
			let keypress = event.key;

			switch (keypress) {
				case 'w':
					this.thrust(true, false);
					// this.thrusters();
					break;
				case 's':
					this.thrust(false, true);
					break;
				case 'a':
					this.turn(true, false);
					break;
				case 'd':
					this.turn(false, true);
					break;
				default:
					return;
			}
		}
	}

	update() {
		this.momentum();
		this.render();
	}

	render() {
		this.ctx.clearRect(this.origin[0] - 100, this.origin[1] - 100, this.origin[0] + 100, this.origin[1] + 100);

		this.ctx.beginPath();
		this.ctx.fillStyle = 'white';

		this.head = this.drawSide(0);
		this.ctx.lineTo( this.head[0], this.head[1] );

		for (let i=1; i < 3; i++) {
			let sides = this.drawSide(i);
			this.ctx.lineTo( sides[0], sides[1] );
		}

		this.ctx.fill();
		this.ctx.strokeStyle = 'green';
		this.ctx.arc( this.head[0], this.head[1], 0.5, 0, Math.PI * 2 );
		this.ctx.stroke();
		this.ctx.closePath();
	}

	drawSide(i) {
		let sides = Math.PI * 2 / 3;
		let results = [ this.origin[0] + this.radius * Math.cos( sides * i + this.rotation ),
										this.origin[1] + this.radius * Math.sin( sides * i + this.rotation ) ];
		return results;
	}

	thrust(pwr = false, breaks = false) {
		let speed = 0.0872665;

		if (pwr && this.vel[0] < 2 && this.vel[1] < 2) {
			this.boost(0, speed);
			this.boost(1, speed);
		}

		if (breaks && this.vel[0] > speed && this.vel[1] > speed) {
			this.breaking(0, speed);
			this.breaking(0, speed);
		}
	}

	boost(pos, speed) {
		if (this.origin[pos] < this.head[pos]) {
			this.vel[pos] += speed; 
		} else if (this.origin[pos] > this.head[pos]) {
			this.vel[pos] -= speed;
		}
	}

	breaking(pos, speed) {
		if (this.origin[pos] < this.head[pos]) {
			this.vel[pos] -= speed;
		} else if (this.origin[pos] > this.head[pos]) {
			this.vel[pos] -= speed;
		}
	}

	momentum() {
		this.origin[0] += this.vel[0];
		this.origin[1] += this.vel[1];
	}

	turn(left = false, right = false) {
		let arcLength = 0.2617994;

		if (left) {
			this.rotation -= arcLength;
			this.head[0] -= arcLength;
			this.head[1] -= arcLength;
		}

		if (right) {
			this.rotation += arcLength;
			this.head[1] += arcLength;
			this.head[1] += arcLength;
		}
	}
}