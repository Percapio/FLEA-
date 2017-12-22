export default class Timer {
	constructor(originPoint) {
		this.originPoint = originPoint;

		this.minute = 2;
		this.seconds = 0;
		this.milliseconds = 1; 
	}

	countdown() {
		this.millisecondsCheck();
		this.secondsCheck();
		// minuteCheck();
		let milliseconds = this.lessThanTen(this.milliseconds);
		let seconds = this.lessThanTen(this.seconds);
		return `0${this.minute} : ${seconds} : ${milliseconds}`;
	}

	minuteCheck() {
	}

	secondsCheck() {
		if (this.seconds < 0) {
			this.minute -= 1;
			this.seconds = 59;
		}
	}

	millisecondsCheck() {
		this.milliseconds -= 1;

		if (this.milliseconds < 0) {
			this.seconds -= 1;
			this.milliseconds = 59;
		}
	}

	lessThanTen(num) {
		return (num < 10) ? '0' + num : num;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'ivory';
		ctx.rect( 210, -300, 120, 30 );
		ctx.fill();
		ctx.closePath();

		ctx.font = '20px Georgia';
		ctx.fillStyle = 'red';
		ctx.fillText( this.countdown(), 220, -280 );
	}
}