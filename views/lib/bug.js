import MovingObject from './moving_object';

export default class Bug extends MovingObject {
	constructor(options) {
		super(options);

		this.x = this.randomPoint();
		this.y = -this.originPoint - 20;

		this.radius = 5;
		this.shade = 'red';
		this.hostile = false;
	}

	update(vely) {
		this.y += 1;

		if (this.y > 0) {
			this.y -= 1;
		} else if (this.y < -this.originPoint) {
			this.y = this.originPoint;
			this.x = this.randomPoint();
		}

		if (this.x > this.originPoint) {
			this.x = -this.originPoint;
			this.y = this.randomPoint();
		} else if (this.x < -this.originPoint) {
			this.x = this.originPoint;
			this.y = this.randomPoint();
		}
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.shade;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
		ctx.closePath();
	}

	randomPoint() {
		return (
			( Math.random() * -this.originPoint )
						+ ( this.originPoint * Math.random() )
		);
	}
}