export default class MovingObject {
	constructor(width, height, ctx) {
		this.COLORS = [
			"#CB3301", 
			"#FF0066", 
			"#FF6666", 
			"#FEFF99", 
			"#FFFF67", 
			"#CCFF66", //yellow-green
			"#99FE00", //neon-green
			"#EC8EED", //
			"#FF99CB", //pig-pink
			"#FE349A", //magenta
			"#CC99FE", //purple-hue
			"#6599FF", //light-blue
			"#03CDFF", //sky-blue
			"#FFFFFF"  //white
		];

		this.CONST = [
			0.2617994,
			0.0872665,
			1.047198
		];

		this.width = width;
		this.height = height;
		this.ctx = ctx;
	}

	collisionCheck(otherPos) {
		let distX = Math.abs(this.pos[0] - otherPos[0]);
		let distY = Math.abs(this.pos[1] - otherPos[1]);

		return ((distX < this.radius) && (distY < this.radius));
	}


	// Border logic
	outsideBorder() {
		// Left & Right walls
		if (this.pos[0] - this.radius <= 1) {
			return true;
		} else if (this.pos[0] + this.radius >= this.width - 1) {
			return true;
		}

		// Top & Bottom walls
		if (this.pos[1] - this.radius <= 1) {
			return true;
		} else if (this.pos[1] + this.radius >= this.height - 1) {
			return true;
		}

		return false;
	}

	wallBounce() {
		// Wall based bouncing 'physics'
		// Top Wall
		if (this.pos[1] + this.radius < 20) {
			this.vel[1] *= -1;
		} 

		// Left Wall
		else if (this.pos[0] + this.radius < 20) {
			this.vel[0] *= -1;
		}

		// Bottom Wall
		else if (Math.abs(this.pos[1] + this.radius - this.height) < 20) {
			this.vel[1] *= -1;
		}

		// Right Wall
		else if (Math.abs(this.pos[0] + this.radius - this.width) < 20) {
			this.vel[0] *= -1;
		}
	}

	// Setup
	checkLocation(radius) {
		if (this.outsideBorder()) {
			this.pos = [ Math.random() * ( this.width - 50 ) + 20 + radius, 
								Math.random() * ( this.height - 50 ) + 20 + radius ];
		}
	}

	randomStart() {
		return [ Math.random() * ( this.width - 150 ) + 125, 
								Math.random() * ( this.height - 150 ) + 125 ]
	}

	// Movement
	thrust(pwr = true, breaks = false, burn) {
		if (pwr && this.vel[0] < 3.2 || this.vel[1] < 3.2) {
			this.boost(pwr, burn);
		}

		if (breaks && this.vel[0] > -3.2 && this.vel[1] > -3.2) {
			this.boost(pwr)
		}
	}

	boost(thrust, burn = 1) {
		// Inverse quadrant based boosts
		let fire = burn;
		let speed = this.CONST[0];
		let direction = thrust ? 1 : -1;

		// Quadrant I
		if (this.pos[0] <= this.head[0] && this.pos[1] <= this.head[1]) {
			this.vel[0] += speed * direction * burn;
			this.vel[1] += speed * direction * burn;
		} 

		// Quadrant II
		else if (this.pos[0] > this.head[0] && this.pos[1] <= this.head[1]) {
			this.vel[0] -= speed * direction * burn;
			this.vel[1] += speed * direction * burn;
		}

		// Quadrant III
		else if (this.pos[0] > this.head[0] && this.pos[1] > this.head[1]) {
			this.vel[0] -= speed * direction * burn;
			this.vel[1] -= speed * direction * burn;
		}

		// Quadrant IV
		else if (this.pos[0] <= this.head[0] && this.pos[1] > this.head[1]) {
			this.vel[0] += speed * direction * burn;
			this.vel[1] -= speed * direction * burn;
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

	decreaseSpeed() {
		if (this.vel[0] > 1) {
				this.vel[0] -= this.CONST[0];
		} else if (this.vel[0] < -1) {
				this.vel[0] += this.CONST[0];
		}

		if (this.vel[1] > 1) {
				this.vel[1] -= this.CONST[0];
		} else if (this.vel[1] < -1) {
				this.vel[1] += this.CONST[0];
		}
	}

}