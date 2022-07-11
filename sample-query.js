// NOTE: make sure the DB is migrated !!!

const User = require("./models").user;
const { Op } = require("sequelize");

// 1.
const getAllUsers = async () => {
  try {
    // This is how we can use a query method to get all the users from the database
    // Selects all rows. Resolves with a (possibly empty) array.
    const allUsers = await User.findAll({ raw: true });
    return allUsers;
  } catch (e) {
    console.log(e);
  }
};

// getAllUsers().then((users) => console.log(users));

// 2.
const getSpecificUser = async () => {
  try {
    const specificUser = await User.findOne({ where: { name: "Bibi Krom" } });
    return specificUser;
  } catch (e) {
    console.log(e);
  }
};

// getSpecificUser().then((specificUser) => console.log(specificUser));

// 3.
const getUserByPk = async () => {
  try {
    const userByPk = await User.findByPk(3);
    return userByPk;
  } catch (e) {
    console.log(e);
  }
};

// getUserByPk().then((userByPk) => console.log(userByPk));
