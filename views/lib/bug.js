import Star from './moving_object';

export default class Bug extends Star {
	constructor(options) {
		super(options);

		this.x = this.velx > 0 
			? Math.random() * this.dimensions * - 1 + this.dimensions
			: Math.random() * this.dimensions + this.dimensions;		

		this.y = this.vely > 0 
			? Math.random() * this.dimensions * - 1
			: Math.random() * this.dimensions;

		this.radius = 5;
		this.shade = 'white';
		this.hostile = false;
	}

	update(velx, vely, container) {
		let arcLength = 2.1816;
		this.x += velx;
		this.y += vely;

		if (((this.x > 0) && (this.x < container)) &&
				((this.y > 0) && (this.y < container))) {
			this.shade = 'red';
			this.hostile = true;
		}

		if (this.y > container - 5) {
			this.y = -1 + Math.random();
		} else if (this.y < 0) {
			this.y = container - 4 + Math.random();
		}

		if (this.x > container - 5) {
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
}