const seneca = require('seneca');
const options = {log: 'test'};

module.exports = function() {
  return seneca(options);
};
