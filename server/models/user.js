const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function hashPassword(user) {
  if (user.changed('password')) {
    return bcrypt.hash(user.password, SALT_ROUNDS)
      .then(hashedPass => user.password = hashedPass);
  }
}

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
