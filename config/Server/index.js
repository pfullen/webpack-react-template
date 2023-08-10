const path = require('path');
const Server = {
  contentBase: path.join(__dirname, '../../dist'),
  port: 3004,
};

module.exports = { Server };
