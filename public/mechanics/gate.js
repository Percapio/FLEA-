import MovingObject from './moving_object';

export default class Gate extends MovingObject {
	constructor(width, height, ctx, pause) {
		super(width, height, ctx);

		this.pos = [ this.width - 50, this.height - 50 ];
		this.radius = 75;
		this.shade = 'green';
		this.pause = pause;

		this.image = new Image();
		this.image.src = './assets/art/Gravity_Field.png';
	}

	update() {
		// this.ctx.save();
		// this.ctx.translate( this.pos[0], this.pos[1] );
		// this.ctx.rotate( (this.angle + 90) * Math.PI / 180 );
		this.ctx.drawImage(this.image, this.pos[0] - this.radius / 2, this.pos[1] - this.radius / 2, this.radius, this.radius);
		// this.ctx.restore();
	}

	endScenario(player) {
		if (this.collisionCheck(player)) {
			console.log('YOU WIN!');
			this.pause('win');
		};
	}
}