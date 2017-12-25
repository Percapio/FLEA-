'use strict';

const request = require('request'),
			cheerio = require('cheerio');

module.exports = () => {

	request('https://github.com/MISP/misp-galaxy/tree/master/clusters',
					(err, res, body) => {
						if (!err && res.statusCode === 200) {
							var $ = cheerio.load(body);
							
							$('td.age', 'table.files').find('time-ago').each( (idx, el) => {
								if (idx === 15) {
									return $(el).text();
								}
							});		
						}
					}
				);
}
