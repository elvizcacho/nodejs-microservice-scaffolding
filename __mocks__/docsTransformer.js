const { join } = require('path');
const YAML = require('yamljs');

module.exports = {
  process() {
    return 'module.exports = ' + JSON.stringify(YAML.load(join(__dirname, '../src/documentation/API-1.0.0-swagger.yaml'))) + ';';
  },
};
