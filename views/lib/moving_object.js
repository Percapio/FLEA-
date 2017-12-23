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

		this.width = width;
		this.height = height;
		this.ctx = ctx;

		this.x;
		this.y;
		this.radius;
		this.shade;
	}

	backdrop() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 170;
		this.ctx.arc( this.x, this.y, 25, 0, Math.PI * 2 );
		this.ctx.stroke();
		this.ctx.closePath();
	}
}