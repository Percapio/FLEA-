import MovingObject from './moving_object';

export default class Bug extends MovingObject {
	constructor(width, height, ctx, name) {
		super(width, height, ctx);

		this.pos = [ Math.random() * ( this.width - 50 ) + 40, 
								Math.random() * ( this.height - 50 ) + 40 ];

		this.radius = 5;
		this.shade = 'red';
		this.name = name;

		for (let i=0; i < 3; i++) {
			this.checkLocation(this.radius);
		}
	}

	show() {
		this.ctx.beginPath();
		this.ctx.fillStyle = this.shade;
		this.ctx.arc( this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2 );
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.font = '9px Arial';
		this.ctx.fillStyle = 'white';
		this.ctx.fillText( this.name, this.pos[0] - 10, this.pos[1] );
	}

	move(origin, hostile = false, endGame) {
		let rangeX = Math.abs(this.pos[0] - origin[0]);
		let rangeY = Math.abs(this.pos[1] - origin[1]);

		if (rangeX < 150 && rangeY < 150) {
			this.guideBug(0, origin, this.CONST[0]);
			this.guideBug(1, origin, this.CONST[0]);

			if (hostile) {
				this.guideBug(0, origin, this.CONST[1]);
				this.guideBug(1, origin, this.CONST[1]);
			}
		}

		this.collisionCheck(origin) ? endGame() : null;
	}

	guideBug(pos, origin, speed) {
		if ( this.pos[pos] < origin[pos] ) {
			this.pos[pos] += speed;
		} else if ( this.pos[pos] > origin[pos] ) {
			this.pos[pos] -= speed;
		}
	}
}