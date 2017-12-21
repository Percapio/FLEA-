export default class Player {
	constructor(width, height, horizontal, velocity) {
		this.width = width;
		this.height = height;
		this.horizontal = horizontal;

		this.x = this.width / 2;
		this.y = this.height / 2;
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