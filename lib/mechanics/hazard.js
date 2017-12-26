import MovingObject from './moving_object';

export default class Hazard extends MovingObject {
	constructor(width, height, ctx, data) {
		super(width, height, ctx);

		this.radius = Math.random() * data.websites.length;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
		this.pos = this.randomStart();

		for (let i=0; i < 3; i++) {
			this.checkLocation();
		}

		this.vel = [ 
			this.CONST[ Math.floor(Math.random() * 3) ],
			this.CONST[ Math.floor(Math.random() * 3) ]
		];			
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();
	}

	move(otherPos, endGame) {
		// if(this.type === 'moving') {
		// 	this.pos[0] += this.vel[0];
		// 	this.pos[1] += this.vel[1];

		// 	if (this.pos[0] < -this.radius) {
		// 		this.pos[0] = this.width + this.radius;
		// 	} else if (this.pos[0] > this.width + 50) {
		// 		this.pos[0] = -this.radius;
		// 	}

		// 	if (this.pos[1] < -this.radius) {
		// 		this.pos[1] = this.height + this.radius;
		// 	} else if (this.pos[1] > this.height + this.radius) {
		// 		this.pos[1] = -this.radius;
		// 	}

		// }

		this.collisionCheck(otherPos) ? endGame() : null;
	}
}