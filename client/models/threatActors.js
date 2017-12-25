'use strict';

// const request = require('request'),
// 			cheerio = require('cheerio'),

// module.exports = () => {

function checker() {
	request('https://github.com/MISP/misp-galaxy/blob/master/clusters/threat-actor.json',
							(err, res, body) => {
								if (!err && res.statusCode === 200) {
									var $ = cheerio.load(body);
									const results = [];

									$('span.pl-s', 'table.hightlight').each ( (idx, el) => {
										console.log();
										// results.push( $(el).text() );
									})
								}

								// return results;
							}
						)
}

// console.log(checker());
checker();