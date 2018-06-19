const jwt = require('jwt-simple');


const User = require('../models').User;
const { JWT_TOKEN } = require('../initializers/passport'); // TODO - as env. variable

const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000; // one week - TODO - as env. variable


module.exports = {
  EXPIRATION_TIME,
  create(req, res) {
    User.create(req.body)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(409).send(error));
  },
  login(req, res) {
    console.log('yup')
    const token = jwt.encode({
      id: req.user.id,
      expirationDate: new Date(Date.now() + EXPIRATION_TIME),
    }, JWT_TOKEN);

    res.status(200).send({ token });
  },
  getAccount(req, res) {
    const next = function (nextReq, nextRes) {
      return nextRes.status(200).send(nextReq.user);
    }.bind(null, req, res);

    passport.authenticate('bearer')(req, res, next);
  },
};
