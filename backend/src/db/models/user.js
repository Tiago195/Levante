const by = require("bcrypt");

/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (Sequelize, DataTypes) => {
  const User = Sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    hooks: {
      beforeCreate: (instance) => {

        const salt = by.genSaltSync(Number(process.env.SALT) ?? 5);
        const hash = by.hashSync(instance.password, salt);
        instance.password = hash;
      },
    }
  });

  User.associate = ({ Reservation }) => {
    User.hasMany(Reservation, {
      as: "reservations",
      foreignKey: "userId",
    });
  };

  return User;
};