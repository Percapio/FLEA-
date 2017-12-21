import MovingObject from './moving_object';

export default class Star extends MovingObject {
	constructor(options) {
		super(options);

		this.x = Math.random() * this.dimensions;
		this.y = Math.random() * this.dimensions;
		this.radius = Math.random() * 3;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
	}

	update(velx, vely, container) {
		let arcLength = 2.1816;
		this.x += velx;
		this.y += vely;


		if (this.y > container - 2) {
			this.y = -1 + Math.random();
		} else if (this.y < 0) {
			this.y = container - 4 + Math.random();
		}

		if (this.x > container - 2) {
			this.x = -1 + Math.random();
		} else if (this.x < 0) {
			this.x = container - 4 + Math.random();
		} 
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.shade;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
};