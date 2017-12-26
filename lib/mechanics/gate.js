import MovingObject from './moving_object';

export default class Gate extends MovingObject {
	constructor(width, height, ctx) {
		super(width, height, ctx);

		this.x = this.width - 50;
		this.y = this.height - 50;
		this.radius = 20;
		this.shade = 'blue';
	}

	update() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.rect( this.x, this.y, 25, 25 );
		this.ctx.fill();
		this.ctx.closePath();
	}

	endScenario(player) {
		if (this.collisionCheck(player)) {
			console.log('YOU WIN!');
		};
	}
}