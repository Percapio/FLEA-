const express     = require('express'),
      logger      = require('morgan'),
      bodyParser  = require('body-parser'),
      path        = require('path');
const app         = express();

app.use( logger('dev' ));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'lib')));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'The Gate is Down...'
}));

module.exports = app;