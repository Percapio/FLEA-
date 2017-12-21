export default class Star {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.x = Math.random() * width;
		this.y = Math.random() * height;
		this.radius = 2;
	}

	update(velx, vely, container) {
		this.y += vely;
		this.x += velx;

		if (this.y > container + 2) {
			this.y = -1 + Math.random();
		} else if (this.y < 0) {
			this.y = container + Math.random();
		}	

		if (this.x > container + 2) {
			this.x = -1 + Math.random();
		} else if (this.x < 0) {
			this.x = container + Math.random();
		}
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
};