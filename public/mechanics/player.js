import MovingObject from './moving_object';

export default class Player extends MovingObject {
	constructor(width, height, ctx, origin, thrusters, pause) {
		super(width, height, ctx);
		this.pos = origin;
		this.image = new Image();
		this.image.src = './assets/art/Player_Speed.png';

		this.radius = 10;

		this.vel = [ 0, 0 ];
		this.thrusters = thrusters;
		this.pause = pause;

		this.head = [ 0, 0 ];
		this.angle = 0;
	}

	move(thrusters) {
		let down = true;
		let prop = 'player';

		document.onkeydown = (event) => {
			if (event.repeat != undefined) {
				down = !event.repeat;
			}

			if (!down) return;
			let keypress = event.key;

			switch (keypress) {
				case 'w':
					this.thrust(true, false);
					this.thrusters();
					break;
				case 'ArrowUp':
					this.thrust(true, false);
					this.thrusters();
					break;
				case 's':
					this.thrust(false, true);
					break;				
				case 'ArrowDown':
					this.thrust(false, true);
					this.thrusters();
					break;
				case 'a':
					this.turn(true, false);
					this.thrusters();
					break;				
				case 'ArrowLeft':
					this.turn(true, false);
					break;
				case 'd':
					this.turn(false, true);
					break;				
				case 'ArrowRight':
					this.turn(false, true);
					break;
				case ' ':
					this.pause(prop);
					break;
				case 'Escape':
					this.pause(prop);
					break;
			}
		}

		document.onkeyup = (event) => { down = true; };
	}

	update() {
		this.momentum();
		this.render();
	}

	render() {
		this.ctx.clearRect(this.pos[0] - 100, this.pos[1] - 100, this.pos[0] + 100, this.pos[1] + 100);

		this.extendFront();
		this.ctx.beginPath();
		this.ctx.strokeStyle = 'blue';
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.beginPath();
		this.ctx.fillStyle = 'blue';
		this.ctx.arc( this.head[0], this.head[1], 3, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.save();
		this.ctx.translate( this.pos[0], this.pos[1] );
		this.ctx.rotate( (this.angle + 90) * Math.PI / 180 );
		this.ctx.drawImage(this.image, 0 - this.radius / 2, 0 - this.radius / 2, this.radius, this.radius);
		this.ctx.restore();
	}

	extendFront() {
		this.head[0] = this.pos[0] + this.radius * (Math.cos(this.angle * Math.PI / 180));
		this.head[1] = this.pos[1] + this.radius * (Math.sin(this.angle * Math.PI / 180));
	}

	turn(left = false, right = false) {
		if (left) {
			this.angleCalibrate();
		}

		if (right) {
			this.angleCalibrate( false );
		}
	}

	angleCalibrate( left = true ) {
		if (left) {
			this.angle -= 12;
		} else {
			this.angle += 12;
		}

		if (this.angle > 365) {
			this.angle = this.angle - 365;
		} else if (this.angle < 0) {
			this.angle = this.angle + 365;
		}
	}
}