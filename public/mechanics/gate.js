import MovingObject from './moving_object';

export default class Gate extends MovingObject {
	constructor(width, height, ctx, pause, player) {
		super(width, height, ctx);

		this.pos = [ this.width - 50, this.height - 50 ];
		this.radius = 30;
		this.shade = 'green';

		this.pause = pause;
		this.player = player;

		this.image = new Image();
		this.image.src = './assets/art/Gravity_Field.png';
	}

	update() {
		this.ctx.drawImage(this.image, this.pos[0] - this.radius / 2, this.pos[1] - this.radius / 2, this.radius, this.radius);
		this.endScenario(this.player.pos);
	}

	endScenario(player) {
		if (this.collisionCheck(player)) {
			let prop = 'win'
			this.pause(prop);
		}
	}
}