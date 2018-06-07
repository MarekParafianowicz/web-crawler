
const User = require('../models').User;

module.exports = {
  create(req, res) {
    console.log('request', req, req.body)
    User.create(req.body)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(409).send(error));
  }
};
