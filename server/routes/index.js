const hackersController   = require('../controllers').hackers,
      websitesController  = require('../controllers').websites,
      keywordsController  = require('../controllers').keywords;

module.exports = app => {
  // GET requests
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Gate is Down!'
  }));
  app.get('/api/hackers', hackersController.list);
  app.get('/api/websites', websitesController.list);
  app.get('/api/keywords', keywordsController.list);

  // POST requests
  app.post('/api/hackers', hackersController.create);
  app.post('/api/websites', websitesController.create);
  app.post('/api/keywords', keywordsController.create);

  // PATCH requests
  app.patch('/api/keywords', keywordsController.update);
}