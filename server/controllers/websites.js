const Website = require('../models').Website;

module.exports = {
  create(req, res) {
    return Website 
      .create({
        url: req.body.url,
        hackerId: req.body.hackerId,
        wordId: req.body.wordId
      })
      .then( website => res.status(200).send(website) )
      .catch( error => res.status(400).send(error) );
  },

  list(req, res) {
    return Website 
      .all()
      .then( websites => res.status(200).send(websites) )
      .catch( error => res.status(400).send(errors) );
  }
}