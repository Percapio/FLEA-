export default class Player {
	constructor(origin, ctx, width, height, thrusters, turns) {
		this.origin = origin;
		this.ctx = ctx;
		this.width = width;
		this.height = height;

		this.radius = 4;
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
		this.show();
	}

	show() {
		this.ctx.clearRect(this.origin[0] - 100, this.origin[1] - 100, this.origin[0] + 100, this.origin[1] + 100);

		this.ctx.beginPath();
		this.ctx.fillStyle = 'green';
		// this.ctx.strokeStyle = 'green';
		// this.ctx.arc( this.originPoint[0], this.originPoint[1], this.radius, 0, Math.PI * 2 );
		// this.ctx.moveTo( this.x - 10, this.y - 10 );
		// this.ctx.lineTo( this.x - 10, this.y );
		// this.ctx.lineTo( this.x, this.y - 5 );

		this.head = this.drawSide(0);
		this.ctx.lineTo( this.head[0], this.head[1] );

		for (let i=1; i < 3; i++) {
			let sides = this.drawSide(i);
			this.ctx.lineTo( sides[0], sides[1] );
		}

		// this.ctx.stroke();
		this.ctx.fill();
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

	backdrop() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 170;
		this.ctx.arc( this.originPoint[0], this.originPoint[1], 25, 0, Math.PI * 2 );
		this.ctx.stroke();
		this.ctx.closePath();
	}
}