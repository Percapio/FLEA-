import { getData } from '../data/json';

export default class Util {
	constructor() {
		this.data;
	}

	counter() {
		return this.data.length;
	}

	grabData( makeBoard ) {
		getData().then( data => {
			this.data = this.handleData(data);
			makeBoard();
		});
	}

	handleData(data) {
		let bigData, smallData;
		[ bigData, smallData ] = this.cherryPick(data);
		
		smallData = this.shuffleData(smallData);
		bigData = this.shuffleData(bigData);
		let newData = bigData.slice(0, bigData.length / 2)
										.concat(smallData.slice(0, smallData.length / 6));

		return this.shuffleData(newData);
	}

	shuffleData(data) {
		let currentIdx = data.length;
		let tempEl, randomIdx;

		while ( 0 !== currentIdx ) {
			randomIdx = Math.floor(Math.random() * currentIdx);
			currentIdx -= 1;

			tempEl = data[currentIdx];
			data[currentIdx] = data[randomIdx];
			data[randomIdx] = tempEl;
		}

		return data;
	}

	cherryPick(data) {
		const bigData = [];
		const smallData = [];

		data.forEach( el => {
			if ( el.websites.length > 1) {
				bigData.push( el );
			} else {
				smallData.push( el );
			}
		});

		return [ bigData, smallData ];
	}
}