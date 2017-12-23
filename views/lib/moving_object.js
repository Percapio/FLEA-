export default class MovingObject {
	constructor(width, height, ctx) {
		this.COLORS = [
			'#F0E68C',
			'#40E0D0',
			'#BDB76B',
			'#3CB371',
			'#F4A460',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',			
			'white',
			'white',
			'white',
			'white'
		];

		this.CONST = [
			0.2617994,
			0.0872665,
			1.047198
		];

		this.TYPE = [ 
			'moving',
			'stationary',
			'stationary',
			'stationary'
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

	outsideBorder(pos, radius) {
		if (pos[0] - radius <= 0) {
			return true;
		} else if (pos[0] + radius >= this.width) {
			return true;
		}

		if (pos[1] - radius <= 0) {
			return true;
		} else if (pos[1] + radius >= this.height) {
			return true;
		}

		return false;
	}

	bounceWidth(pos, radius) {
		if (pos - radius <= 0) {
			pos = pos + this.CONST[0];
		} else if (pos + radius >= this.width) {
			pos = pos - this.CONST[0];
		}

		return pos;
	}

	bounceHeight(pos, radius) {
		if (pos - radius <= 0) {
			pos = pos + this.CONST[0];
		} else if (pos + radius >= this.height) {
			pos = pos - this.CONST[0];
		}

		return pos;
	}

	checkLocation(radius) {
		if (this.outsideBorder(this.pos, radius)) {
			this.pos = [ Math.random() * ( this.width - 50 ) + 20 + radius, 
								Math.random() * ( this.height - 50 ) + 20 + radius ];
		}
	}
}