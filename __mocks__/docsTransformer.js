const { join } = require('path');
const YAML = require('yamljs');

module.exports = {
  process() {
    return (
      'module.exports = ' +
      JSON.stringify(
        YAML.load(join(__dirname, '../src/documentation/build/openapi.yaml')),
      ) +
      ';'
    );
  },
};
