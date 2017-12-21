export default class Player {
	constructor(dimensions, horizontal, velocity) {
		this.dimensions = dimensions;
		this.horizontal = horizontal;

		this.x = this.dimensions / 2;
		this.y = this.dimensions / 2;
		this.radius = 8;
	}

	update(up, down, right, left) {
		window.onkeydown = (e) => {
			let keypress = event.key;
			let horizontal;

			switch (keypress) {
				case 'w':
					up();
					break;
				case 's':
					down();
					break;
				case 'a':
					left();
					break;
				case 'd':
					right();
					break;
				default:
					return;
			}
		}
	}	

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
}