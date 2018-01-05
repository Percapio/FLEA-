const Hacker  = require('../models').Hacker,
      Website = require('../models').Website,
      Keyword = require('../models').Keyword;

module.exports = {
  create(req, res) {
    return Keyword 
      .create({ word: req.body.word })
      .then( word => res.status(200).send(word) )
      .catch( error => res.status(400).send(error) );
  },

  update(req, res) {
    return Keyword 
      .find({ 
        where: {
          id: req.body.id
        }
      })
      .then( keyword => {
        if (!keyword) {
          return res.status(400).send({
            message: 'Keyword Not Found'
          });
        }

        return keyword 
          .update( req.body, { fields: Object.keys(req.body) })
          .then( updatedKeyword => res.status(200).send(updatedKeyword) )
          .catch( error => res.status(400).send(error) );
      })
  },

  list(req, res) {
    return Keyword
      .findAll({
        include: [
          'websites'
        ]
      })
      .then(hackers => res.status(200).send(hackers))
      .catch(error => res.status(400).send(error));
  }
}