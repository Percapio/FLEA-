const Hacker  = require('../models').Hacker,
      Website = require('../models').Website,
      Keyword = require('../models').Keyword;

module.exports = {
  create(req, res) {
    return Hacker
      .create({
        name: req.body.name,
        country: req.body.country
      })
      .then( todo => res.status(201).send(todo) )
      .catch( error => res.status(400).send(error) );
  },

  list(req, res) {
    return Hacker
      .findAll({
        include: [
          'websites',
          'keywords'
        ]
      })
      // .all()
      .then( hackers => res.status(200).send(hackers) )
      .catch( error => res.status(400).send(error) );
  }
}