const usersController = require('../controllers').users;
const passport = require('passport');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the API!',
  }));

  app.post('/api/users', usersController.create);
  app.post('/api/users/login', passport.authenticate('local'), usersController.login);
  app.get('/api/users/me', usersController.getAccount);
};
