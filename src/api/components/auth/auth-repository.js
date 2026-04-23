const { Users } = require('../../../models');

async function getUserByEmail(email) {
  return Users.findOne({ email });
}
async function getUserById(id) {
  return Users.findById(id);
}

module.exports = {
  getUserByEmail,
  getUserById,
};
