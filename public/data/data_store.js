// 'use strict';

// const request = require('cheerio-req');

// export function pullDate() {
// 	let date;

// 	request('https://github.com/MISP/misp-galaxy/tree/master/clusters', (err, $) => {
// 		debugger;
// 		if (err) {
// 			console.log(err);
// 			return;
// 		} else {
// 			debugger;
// 			date = $('time-ago', 'tr.js-navigation-item')[-2].attr('title');
// 		}
// 	});

// 	return date;
// };

// export function checkData(datafile) {
// 	return datafile == pullDate();
// }

// export function saveData(data, date) {
// 	let datafile = { 
// 		[ 'date' ] : '12/27/2017',
// 		[ 'data' ] : data
// 	};

// 	let client = new pg.Client('pg://admin:soloho@localhost:11440/my_website');
// 	debugger;
// 	client.connect();

// 	client.query('CREATE TABLE IF NOT EXISTS hackers(date varchar(64), data array)');
// 	client.query('INSERT INTO hackers(date, data) values($1, $2)', [ datafile.date, datafile.data ]);

// 	client.end();
// }

// export function loadData() {
// 	request.open('GET', './date_file.txt', false);
// 	request.onreadystatechange = () => {
// 		if (request.readystate === 4) {
// 			if (request.status === 200 || request.status === 0) {
// 				return request.responseText;
// 			}
// 		}
// 	}

// 	request.send(null);
// }