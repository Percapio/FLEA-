export default class Player {
	constructor(originPoint, horizontal, velocity) {
		this.originPoint = originPoint;
		this.horizontal = horizontal;

		this.y = 50;
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
					// this.x -= arcLength;
					// this.y -= arcLength;
					break;
				case 'd':
					right();
					// this.x += 10;
					// this.y -= 1;
					break;
				default:
					return;
			}
		}
	}	

	show(ctx) {
		// ctx.beginPath();
		// ctx.fillStyle = rgba(0, 0, 0, 0.1);
		// ctx.rect(0, 0, this.originPoint * 2, this.originPoint * 2);
		// ctx.fill();
		// ctx.closePath();

		ctx.clearRect(0, 0, this.originPoint * 2, this.originPoint * 2);
		ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.arc( 0, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
		ctx.closePath();
	}

	move() {

	}
}