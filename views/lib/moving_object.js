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
		]

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

	collisionCheck(otherPos, otherRadius) {
		if ((this.pos - this.radius >= otherPos + otherRadius) && (this.pos + this.radius >= otherPos - otherRadius)) {
			console.log('down');
		} else if ((this.pos - this.radius >= otherPos - otherRadius) && (this.pos + this.radius <= otherPos + otherRadius)) {
			console.log('up');
		}
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
			pos = this.width - pos;
		}

		return pos;
	}

	bounceHeight(pos, radius) {
		if (pos - radius <= 0) {
			pos = pos + this.CONST[0];
		} else if (pos + radius >= this.height) {
			pos = this.height - pos;
		}

		return pos;
	}
}