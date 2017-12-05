import MovingObject from './moving_objects';

class Player extends MovingObject {
	constructor(options) {
		super(options);

		// this.vector = [this.x + 50, this.y];
		this.yAdjust = this.y;
		this.xAdjust = this.x + 50;
	}


	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'red';
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.strokeStyle = 'red';
		ctx.moveTo(this.x - (this.radius / 2), this.y); 
		ctx.lineTo(this.xAdjust, this.yAdjust);
		ctx.stroke();
		ctx.closePath();
	}

	update() {
		window.onkeydown = (event) => {
			let keypress = event.key;
			let arcLength = 0.218166;

			console.log(keypress);
			switch(keypress) {

				case ' ':
					this.x += 50;
					// console.log(this.vector);
					
				case 'ArrowLeft':
					//Quadrant 1
					if (this.xAdjust >= 0 && this.yAdjust >= 0) {
						this.xAdjust -= arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 2
					else if (this.xAdjust < 0 && this.yAdjust >= 0) {
						this.xAdjust -= arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 3
					else if (this.xAdjust < 0 && this.yAdjust < 0) {
						this.xAdjust += arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 4
					else if (this.xAdjust >= 0 && this.yAdjust < 0) {
						this.xAdjust += arcLength;
						this.yAdjust += arcLength;
					}

				case 'ArrowRight':
					//Quadrant 1
					if (this.xAdjust >= 0 && this.yAdjust >= 0) {
						this.xAdjust += arcLength;
						this.yAdjust -= arcLength;
					}

					//Quadrant 2
					else if (this.xAdjust < 0 && this.yAdjust >= 0) {
						this.xAdjust += arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 3
					else if (this.xAdjust < 0 && this.yAdjust < 0) {
						this.xAdjust -= arcLength;
						this.yAdjust += arcLength;
					}

					//Quadrant 4
					else if (this.xAdjust >= 0 && this.yAdjust < 0) {
						this.xAdjust -= arcLength;
						this.yAdjust -= arcLength;
					}

				default:
					return;
			}
		}
	}
}

export default Player;