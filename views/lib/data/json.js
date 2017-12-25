
export function getData() {
	return new Promise( (resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open('GET', 'https://rawgit.com/MISP/misp-galaxy/master/clusters/threat-actor.json');
		request.onload = () => {
			const data = JSON.parse( request.responseText ).values;
			const actors = [];

			for (let i=0; i < data.length; i++) {
				const websites = data[i].meta.refs;

				if (typeof websites != 'undefined') {
					let actorObject = { 
						[ 'name' ]: data[i].value,
						[ 'websites' ]: websites
					};
					actors.push( actorObject );
				}
			}

			resolve(actors);
		};
		request.send();
	})
};