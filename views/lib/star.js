export default class Star {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.radius = 2;
	}

	update(speed) {
		// let dx, dy;

		// this.x = Math.abs( (this.x + dx) % speed );

		// if (this.x < 1) {
		// 	this.x = this.width;
		// }
	}

		// this.x -= speed;

		// if (this.x < 1 || this.y < 1) {
		// 	this.z = this.width;
		// 	this.x = Math.random() * this.width;
		// 	this.y = Math.random() * this.height;
		// }

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
};