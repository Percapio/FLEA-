import { pullDate, checkData, saveData, loadData } from './data_store.js';

export function getData() {
	const KEYWORDS = [
		''
	]

	// let fileDate = pullDate();

	return new Promise( (resolve, reject) => {
		const request = new XMLHttpRequest(),
					 actors = [];

		request.open('GET', 'https://rawgit.com/MISP/misp-galaxy/master/clusters/threat-actor.json');
		request.onload = () => {
			const data = JSON.parse( request.responseText ).values;

			for (let i=0; i < data.length; i++) {
				const websites = data[i].meta.refs;

				if (typeof websites != 'undefined') {
					// if (websites.length > 1) {

					// }

					let actorObject = { 
						[ 'name' ]: data[i].value,
						[ 'websites' ]: websites,
						// [ 'keywords' ]: keywords
					};
					actors.push( actorObject );
				}
			}

			// saveData(actors);
			resolve(actors);
		};
		request.send();
	})
};