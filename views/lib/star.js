import MovingObject from './moving_object';

export default class Star extends MovingObject {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.x = Math.random() * this.width;
		this.y = Math.random() * this.height;

		this.radius = Math.random() * 1;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
	}

	update(vely) {
		// this.y += vely;

		// if (this.y > this.originPoint) {
		// 	this.y = -this.originPoint;
		// 	this.x = this.randomPoint();
		// } else if (this.y < -this.originPoint) {
		// 	this.y = this.originPoint;
		// 	this.x = this.randomPoint();
		// }

		// if (this.x > this.originPoint) {
		// 	this.x = -this.originPoint;
		// 	this.y = this.randomPoint();
		// } else if (this.x < -this.originPoint) {
		// 	this.x = this.originPoint;
		// 	this.y = this.randomPoint();
		// }
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();
	}
};