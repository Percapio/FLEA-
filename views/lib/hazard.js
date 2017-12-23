import MovingObject from './moving_object';

export default class Hazard extends MovingObject {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.type = this.TYPE[Math.floor(Math.random() * 2)];

		this.radius = Math.random() * (50 - 20) + 20;
		this.shade = this.COLORS[Math.floor(Math.random() * 5)];

		this.pos = [ Math.random() * ( this.width - 50 ) + 20, 
								Math.random() * ( this.height - 50 ) + 20 ];

		for (let i=0; i < 3; i++) {
			this.checkLocation(this.radius);
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
		if(this.type === 'moving') {
			this.pos[0] += this.vel[0];
			this.pos[1] += this.vel[1];

			if (this.pos[0] < -this.radius) {
				this.pos[0] = this.width + this.radius;
			} else if (this.pos[0] > this.width + 50) {
				this.pos[0] = -this.radius;
			}

			if (this.pos[1] < -this.radius) {
				this.pos[1] = this.height + this.radius;
			} else if (this.pos[1] > this.height + this.radius) {
				this.pos[1] = -this.radius;
			}

			this.collisionCheck(otherPos) ? endGame() : null;
		}
	}
}