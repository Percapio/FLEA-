const path = require('path');

module.exports = {
	'config': path.resolve('./client/config', 'config.json'),
	'models-path': path.resolve('./client/models'),
	'seeders-path': path.resolve('./client/seeders'),
	'migrations-path': path.resolve('./client/migrations')
}