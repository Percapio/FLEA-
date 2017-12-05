import Computer from './computer';

class Game {
	constructor() {
		this.enemyAIs = [];

		this.populate();
	}

	populate() {
		let options = {
			x: 50,
			y: 50,
			vel: 1,
			radius: 10
		}

		this.enemyAIs.push(new Computer(options));
	}

	moveEnemy(ctx) {
		for (let i=0; i< 10; i++) {
			this.enemyAIs[0].draw(ctx);
			this.enemyAIs[0].move();
		}
	}
}

export default Game;