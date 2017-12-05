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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);



document.addEventListener('DOMContentLoaded', () => {
	let canvas = document.getElementById('survivePlaceholder');
	let ctx = canvas.getContext('2d');


	move(ctx);
});

//Clear Board
function refresh(ctx) {
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.rect(0, 0, 400, 400);
	ctx.fill();
	ctx.closePath();
}

//Draw flea
function draw(ctx, x, y, radius) {
	refresh(ctx);

	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.closePath();
}

//Move Flea
function move(ctx) {
	let x = 50;
	let y = 50;
	let radius = 5;

	setInterval( () => {
		draw(ctx, x, y, 5);


	}, 20);
}

document.addEventListener('keypress', (event) => {
	let key = event.keyCode;

	if(key == 32) {
		x = someKey(x);
	}

	return x;
});



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__computer__ = __webpack_require__(2);


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

		this.enemyAIs.push(new __WEBPACK_IMPORTED_MODULE_0__computer__["a" /* default */](options));
	}

	moveEnemy(ctx) {
		for (let i=0; i< 10; i++) {
			this.enemyAIs[0].draw(ctx);
			this.enemyAIs[0].move();
		}
	}
}

/* unused harmony default export */ var _unused_webpack_default_export = (Game);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_objects__ = __webpack_require__(3);


class Computer extends __WEBPACK_IMPORTED_MODULE_0__moving_objects__["a" /* default */] {

	constructor(options) {
		super(options);
	}

	draw(ctx) {
		ctx.clearRect(0, 0, 400, 400);
		ctx.beginPath();
		ctx.strokeStyle = 'red';
		ctx.arc(this.x, this.y, Math.PI * this.radius, 0, 0);
		ctx.fill();
	}

}

/* harmony default export */ __webpack_exports__["a"] = (Computer);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MovingObject {
	constructor(options) {
		this.x = options.x;
		this.y = options.y;
		this.radius = options.radius;
		this.vel = options.vel;
	}

	move() {
		//Temporary movement to see effects
		this.vel++;
		this.x += this.vel;
		this.y += this.vel;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);

/***/ })
/******/ ]);