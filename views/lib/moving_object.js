export default class MovingObject {
	constructor(width, height) {
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

		this.x;
		this.y;
		this.radius;
		this.shade;
	}
}