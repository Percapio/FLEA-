export default class Player {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.x = this.width / 2;
		this.y = this.height / 2;
		this.radius = 8;
	}

	update(speed) {

	}	

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
}