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
	}

	backdrop(origin, ctx) {
		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 170;
		ctx.arc( origin[0], origin[1], 25, 0, Math.PI * 2 );
		ctx.stroke();
		ctx.closePath();
	}
}