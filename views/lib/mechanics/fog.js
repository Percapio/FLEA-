import Player from './player';

export default class Fog extends Player {
	constructor( width, height, ctx ){
		super(width, height, ctx);

		this.shade = 'black';
	}

	render(origin) {
		this.ctx.restore();
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.rect(0, 0, this.width, this.height);
		this.ctx.fill();
		this.ctx.closePath();


		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.arc( origin[0], origin[1], 100, 0, Math.PI * 2 );
		this.ctx.clip();
		this.ctx.closePath();

		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.restore();
	}

	drawSide() {

	}
}