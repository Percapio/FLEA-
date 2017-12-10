import MovingObject from './moving_objects';

class Player extends MovingObject {
	constructor(options) {
		super(options);

		this.xAdjust = this.pos[0] + 50;
		this.yAdjust = this.pos[1];
	}


	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'red';
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.strokeStyle = 'red';
		ctx.moveTo(this.pos[0], this.pos[1]); 
		ctx.lineTo(this.xAdjust, this.yAdjust);
		ctx.stroke();
		ctx.closePath();
	}


	update() {
		window.onkeydown = (event) => {
			let keypress = event.key;
			let arcLength = 2.18166;

			switch(keypress) {

				case ' ':
				 	this.pos[0] = this.xAdjust;
				 	if (this.xAdjust >= this.pos[0]) {
					 	this.xAdjust += 25;
				 	} else if (this.xAdjust < this.pos[0]) {
				 		this.xAdjust -= 25;
				 	}


				 	this.pos[1] = this.yAdjust;
				 	if (this.yAdjust >= this.pos[1]) {
				 		this.yAdjust += arcLength;
				 	} else if (this.yAdjust < this.pos[1]) {
				 		this.yAdjust -= arcLength;
				 	}
				  break;

				case 'ArrowRight':
					//Quadrant 1
					if (this.xAdjust >= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 2
					else if (this.xAdjust <= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 3
					else if (this.xAdjust <= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 4
					else if (this.xAdjust >= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust += arcLength;
					}
					break;

				case 'ArrowLeft':
					//Quadrant 1
					if (this.xAdjust >= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 2
					else if (this.xAdjust <= this.pos[0] && this.yAdjust >= this.pos[1]) {
						this.xAdjust += arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 3
					else if (this.xAdjust <= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 4
					else if (this.xAdjust >= this.pos[0] && this.yAdjust <= this.pos[1]) {
						this.xAdjust -= arcLength;
						this.yAdjust -= arcLength;
					}
					break;

				default:
					return;
			}
		}
	}
}

export default Player;