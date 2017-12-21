/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__star__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bug__ = __webpack_require__(5);




window.addEventListener('DOMContentLoaded', () => {
	const DIMENSIONS = 600;

	const canvas = document.getElementById('gateIsDown');
	const ctx = canvas.getContext('2d');

	const stars = [];
	const bugs = [];
	let velx = 1;
	let vely = 1;
	let player;

	// Callback functions to move background and determine its velocity
	function moveUp() {
		if (vely < 11) {
			vely += 1;
		}
	}

	function moveDown() {
		if (vely > -11) {
			vely -= 1;
		}
	}

	function moveLeft() {
		if (velx < 11) {
			velx += 1;
		}
	}

	function moveRight() {
		if (velx > -11) {
			velx -= 1;
		}
	}

	// Initial setup of player, stars, computer, and board
	function setup() {
		player = new __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */](DIMENSIONS, 
			() => move().bind(this), 
			() => velocity().bind(this) );

		for (let i=0; i < 150; i++) {
			stars[i] = new __WEBPACK_IMPORTED_MODULE_0__star__["a" /* default */](DIMENSIONS);
		}

		for (let i=0; i < 50; i++) {
			bugs[i] = new __WEBPACK_IMPORTED_MODULE_2__bug__["a" /* default */](DIMENSIONS);
		}
	}

	function background(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.rect(0, 0, DIMENSIONS, DIMENSIONS);
		ctx.fill();
		ctx.closePath();
	}

	// Rendering function
	function play(ctx) {
		setup();

		setInterval( () => {
			background(ctx);
			moveObjects();
			player.show(ctx);
			player.update( 
				() => moveUp(),
				() => moveDown(),
				() => moveRight(),
				() => moveLeft() );
			moveBugs();
		}, 40);
	}

	function moveObjects() {
		for (let i=0; i < stars.length; i++) {
			stars[i].show(ctx);
			stars[i].update(velx, vely, DIMENSIONS);
		}
	}

	function moveBugs() {
		for (let i=0; i < bugs.length; i++) {
			bugs[i].show(ctx);
			bugs[i].update(velx, vely, DIMENSIONS);
		}
	}
	
	// Start the game
	play(ctx);
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(4);


class Star extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(options) {
		super(options);

		this.velx, this.vely;

		this.x = Math.random() * this.dimensions;
		this.y = Math.random() * this.dimensions;
		this.radius = Math.random() * 3;
		this.shade = this.COLORS[Math.floor(Math.random() * this.COLORS.length)];
	}

	update(velx, vely, container) {
		let arcLength = 2.1816;
		this.x += velx;
		this.y += vely;

		this.velx = velx;
		this.vely = vely;

		if (this.y > container - 2) {
			this.y = -1 + Math.random();
		} else if (this.y < 0) {
			this.y = container - 4 + Math.random();
		}

		if (this.x > container - 2) {
			this.x = -1 + Math.random();
		} else if (this.x < 0) {
			this.x = container - 4 + Math.random();
		} 
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.shade;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Star;
;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
	constructor(dimensions, horizontal, velocity) {
		this.dimensions = dimensions;
		this.horizontal = horizontal;

		this.x = this.dimensions / 2;
		this.y = this.dimensions / 2;
		this.radius = 8;
	}

	update(up, down, right, left) {
		window.onkeydown = (e) => {
			let keypress = event.key;
			let horizontal;

			switch (keypress) {
				case 'w':
					up();
					break;
				case 's':
					down();
					break;
				case 'a':
					left();
					break;
				case 'd':
					right();
					break;
				default:
					return;
			}
		}
	}	

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'green';
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Player;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MovingObject {
	constructor(dimensions) {
		this.COLORS = [
			'#F0E68C',
			'#40E0D0',
			'#BDB76B',
			'#3CB371',
			'#F4A460',
			'white',
			'white',
			'white',			
			'white',
			'white',
			'white',
			'white',
			'white',
			'white',			
			'white',
			'white',
			'white',
			'white'
		];

		this.dimensions = dimensions;

		this.x;
		this.y;
		this.radius;
		this.shade;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object__ = __webpack_require__(4);


class Bug extends __WEBPACK_IMPORTED_MODULE_0__moving_object__["a" /* default */] {
	constructor(options) {
		super(options);

		this.x = this.velx > 0 
			? Math.random() * this.dimensions * - 1 + this.dimensions
			: Math.random() * this.dimensions + this.dimensions;		

		this.y = this.vely > 0 
			? Math.random() * this.dimensions * - 1
			: Math.random() * this.dimensions;

		this.radius = 5;
		this.shade = 'white';
		this.hostile = false;
	}

	update(velx, vely, container) {
		let arcLength = 2.1816;
		this.x += velx;
		this.y += vely;

		if (((this.x > 0) && (this.x < container)) &&
				((this.y > 0) && (this.y < container))) {
			this.shade = 'red';
			this.hostile = true;
		}

		if (this.y > container - 5) {
			this.y = -1 + Math.random();
		} else if (this.y < 0) {
			this.y = container - 4 + Math.random();
		}

		if (this.x > container - 5) {
			this.x = -1 + Math.random();
		} else if (this.x < 0) {
			this.x = container - 4 + Math.random();
		} 
	}

	show(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.shade;
		ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2 );
		ctx.fill();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Bug;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map