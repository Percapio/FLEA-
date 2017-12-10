import Computer from './computer';

class Game {
	constructor() {
		this.enemyAIs = [];
		this.populate();
	}

	populate() {
		let options = {
			pos: [50, 50],
			vel: 1,
			radius: 10,
			vector: [ Game.MAX_X * Math.random(), Game.MAX_Y * Math.random() ],
			game: this
		}

		this.enemyAIs.push(new Computer(options));
		debugger;
	}

	moveEnemy(ctx) {
		// debugger;
		this.enemyAIs[0].draw(ctx);
		this.enemyAIs[0].update();
	}

	outOfBounds(posX, posY) {
		return (posX < 0 || posX > Game.MAX_X || posY < 0 || posY > Game.MAX_Y);
	}
}

Game.MAX_X = 1000;
Game.MAX_Y = 600;

export default Game;