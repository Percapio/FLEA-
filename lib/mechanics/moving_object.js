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

	backdrop(origin, ctx) {
		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 170;
		ctx.arc( origin[0], origin[1], 25, 0, Math.PI * 2 );
		ctx.stroke();
		ctx.closePath();
	}

	collisionCheck(otherPos) {
		let distX = Math.abs(this.pos[0] - otherPos[0]);
		let distY = Math.abs(this.pos[1] - otherPos[1]);

		return ((distX < this.radius) && (distY < this.radius));
	}

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
}