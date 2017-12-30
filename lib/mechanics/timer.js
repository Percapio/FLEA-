export default class Timer {
	constructor(width, height, ctx) {
		this.width = width;
		this.height = height;
		this.ctx = ctx;

		this.minute = 2;
		this.seconds = 40;
		this.milliseconds = 1; 
	}

	countdown() {
		this.millisecondsCheck();
		this.secondsCheck();
		// minuteCheck();
		let minutes = this.lessThanTen(this.minute);
		let milliseconds = this.lessThanTen(this.milliseconds);
		let seconds = this.lessThanTen(this.seconds);
		return `${minutes} : ${seconds} : ${milliseconds}`;
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

	update() {
		this.ctx.clearRect( (this.width / 2 ) - 75, (this.height - 25), 120, 50 );

		this.ctx.font = '20px Georgia';
		this.ctx.fillStyle = 'red';
		this.ctx.fillText( this.countdown(), (this.width / 2 ) - 66, (this.height - 8 ) );
	}
}