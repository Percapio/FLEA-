class MovingObject {
	constructor(options) {
		this.x = options.x;
		this.y = options.y;
		this.radius = options.radius;
		this.vel = options.vel;
	}

	// move() {
	// 	//Temporary movement to see effects
	// 	this.vel++;
	// 	this.x += this.vel;
	// 	this.y += this.vel;
	// }
}

export default MovingObject;