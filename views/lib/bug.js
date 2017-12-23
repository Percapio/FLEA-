import MovingObject from './moving_object';

export default class Bug extends MovingObject {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.pos = [ Math.random() * ( this.width - 50 ) + 40, 
								Math.random() * ( this.height - 50 ) + 40 ];

		this.radius = 5;
		this.shade = 'red';
	}

	update(vely) {
		// this.y += 1;

		// if (this.y > 0) {
		// 	this.y -= 1;
		// } else if (this.y < -this.originPoint) {
		// 	this.y = this.originPoint;
		// 	this.x = this.randomPoint();
		// }

		// if (this.x > this.originPoint) {
		// 	this.x = -this.originPoint;
		// 	this.y = this.randomPoint();
		// } else if (this.x < -this.originPoint) {
		// 	this.x = this.originPoint;
		// 	this.y = this.randomPoint();
		// }
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();
	}

	spotPlayer(origin, hostile = false) {
		let rangeX = Math.abs(this.pos[0] - origin[0]);
		let rangeY = Math.abs(this.pos[1] - origin[1]);

		if (rangeX < 150 && rangeY < 150) {
			if (hostile) {

				this.guideBug(0, origin);
				this.guideBug(1, origin);
			}
		}

		this.show();
	}

	guideBug(pos, origin) {
		let speed = 5;

		if ( this.pos[pos] < origin[pos] ) {
			this.pos[pos] += speed;
		} else if ( this.pos[pos] > origin[pos] ) {
			this.pos[pos] -= speed;
		}
	}
}