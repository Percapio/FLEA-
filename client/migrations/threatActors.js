'use strict';

const ThreatActors = require('../models/threatActors');

function getThreats() {
	return ThreatActors(); 
}

console.log(getThreats());