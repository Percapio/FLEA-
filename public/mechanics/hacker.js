import MovingObject from './moving_object';

export default class Hacker extends MovingObject {
	constructor(width, height, ctx, name) {
		super(width, height, ctx);

		this.pos = this.randomStart();
		this.image = new Image();
		this.image.src = './assets/art/Enemy_Bullet.png';

		this.radius = 10;
		this.shade = 'red';
		this.name = name;

		for (let i=0; i < 3; i++) {
			this.checkLocation();
		}

		this.vel = [ 0, 0 ]
		this.head = [ 0, 0 ];
		this.angle = 0;
		this.movement = 0;
	}

	show() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.shade;
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.stroke();
		this.ctx.closePath();

		this.ctx.drawImage(this.image, this.pos[0] - this.radius / 2, this.pos[1] - this.radius / 2, this.radius, this.radius);

		this.ctx.font = '9px Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText( this.name, this.pos[0] - 15, this.pos[1] );
	}

	move(origin, hostile = false, endGame) {
		let rangeX = Math.abs(this.pos[0] - origin[0]);
		let rangeY = Math.abs(this.pos[1] - origin[1]);
		this.momentum();

		// Locating Player
		this.head[0] = origin[0];
		this.head[1] = origin[1];

		if (this.movement <= 0) {
			if (rangeX < 100 && rangeY < 100) {
				this.thrust(true);
				this.movement += 2;
			}

			if (hostile && rangeX < 300 && rangeY < 300) {
					this.thrust(true);
					this.movement += 100;
			}

			if (hostile && rangeX < 200 && rangeY < 200) {
					this.thrust(true);
					this.movement += 100;
			}
		} else if (this.movement > 0) {
			this.decreaseSpeed();
			this.movement -= 1;
		}

		this.collisionCheck(origin) ? endGame('lose') : null;
	}

	guide(pos, origin, speed) {
		if ( this.pos[pos] < origin[pos] ) {
			this.pos[pos] += speed;
		} else if ( this.pos[pos] > origin[pos] ) {
			this.pos[pos] -= speed;
		}
	}
}