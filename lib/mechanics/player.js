import MovingObject from './moving_object';

export default class Player extends MovingObject {
	constructor(width, height, ctx, origin, thrusters) {
		super(width, height, ctx);
		this.pos = origin;

		this.radius = 5;
		this.rotation = 0;

		this.vel = [ 0, 0 ];
		this.thrusters = thrusters;

		this.head = this.drawSide(0);
	}

	move(thrusters) {
		let down = true;

		document.onkeydown = (event) => {
			if (event.repeat != undefined) {
				down = !event.repeat;
			}

			if (!down) return;
			let keypress = event.key;

			switch (keypress) {
				case 'w':
					this.thrust(true, false);
					this.thrusters(this.pos, this.radius);
					break;
				case 'ArrowUp':
					this.thrust(true, false);
					this.thrusters(this.pos, this.radius);
					break;
				case 's':
					this.thrust(false, true);
					break;				
				case 'ArrowDown':
					this.thrust(false, true);
					break;
				case 'a':
					this.turn(true, false);
					break;				
				case 'ArrowLeft':
					this.turn(true, false);
					break;
				case 'd':
					this.turn(false, true);
					break;				
				case 'ArrowRight':
					this.turn(false, true);
					break;
				default:
					return;
			}
		}

		document.onkeyup = (event) => { down = true };
	}

	update() {
		this.momentum();
		this.render();
	}

	render() {
		this.ctx.clearRect(this.pos[0] - 100, this.pos[1] - 100, this.pos[0] + 100, this.pos[1] + 100);

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
		let results = [ this.pos[0] + this.radius * Math.cos( sides * i + this.rotation ),
										this.pos[1] + this.radius * Math.sin( sides * i + this.rotation ) ];
		return results;
	}

	thrust(pwr = false, breaks = false) {
		if (pwr && this.vel[0] < 3.2 || this.vel[1] < 3.2) {
			this.boost(pwr);
		}

		if (breaks && this.vel[0] > -3.2 && this.vel[1] > -3.2) {
			this.boost(pwr)
		}
	}

	boost(thrust) {
		// Inverse quadrant based boosts
		let speed = this.CONST[0];
		let direction = thrust ? 1 : -1;

		// Quadrant I
		if (this.pos[0] <= this.head[0] && this.pos[1] <= this.head[1]) {
			this.vel[0] += speed * direction;
			this.vel[1] += speed * direction;
		} 

		// Quadrant II
		else if (this.pos[0] > this.head[0] && this.pos[1] <= this.head[1]) {
			this.vel[0] -= speed * direction;
			this.vel[1] += speed * direction;
		}

		// Quadrant III
		else if (this.pos[0] > this.head[0] && this.pos[1] > this.head[1]) {
			this.vel[0] -= speed * direction;
			this.vel[1] -= speed * direction;
		}

		// Quadrant IV
		else if (this.pos[0] <= this.head[0] && this.pos[1] > this.head[1]) {
			this.vel[0] += speed * direction;
			this.vel[1] -= speed * direction;
		}
	}

	momentum() {
		if (this.outsideBorder()) {
			this.wallBounce();
			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];
		} else {
			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];
		}
	}

	turn(left = false, right = false) {
		if (left) {
			this.rotation -= this.CONST[0];
			this.head[0] -= this.CONST[0];
			this.head[1] -= this.CONST[0];
		}

		if (right) {
			this.rotation += this.CONST[0];
			this.head[1] += this.CONST[0];
			this.head[1] += this.CONST[0];
		}
	}
}