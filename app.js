const express     = require('express'),
      logger      = require('morgan'),
      bodyParser  = require('body-parser');
const app         = express();

app.use( logger('dev' ));
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }));

require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'The Gate is Down...'
}));

module.exports = app;