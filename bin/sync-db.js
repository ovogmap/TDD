const medels = require("../models.js");

module.exports = () => {
  return medels.sequelize.sync({ force: true });
};
