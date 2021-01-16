/* eslint-disable @typescript-eslint/no-var-requires */
const YAML = require('yamljs');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const _path = require('path');

if (!argv.file) {
  throw Error('Please specify a --file and a --out parameter ');
}

const getFolderPathFromFilePath = (filePath) => {
  const pathChunks = filePath.split('/');
  pathChunks.pop();
  return pathChunks;
};

const sourceFolderPath = getFolderPathFromFilePath(argv.file);
const source = YAML.load(argv.file);

const {
  paths,
  components: { parameters, schemas, responses },
} = source;

const updateRefsOfObject = (yaml) => {
  const { yaml: obj, path } = yaml;

  return Object.keys(obj).reduce((result, key) => {
    if (obj[key].$ref) {
      obj[key].$ref = `./${_path.join(
        ...getFolderPathFromFilePath(path),
        obj[key].$ref.split('/')[1],
      )}`;
    }
    result[key] = obj[key];
    return result;
  }, {});
};

const fixPathForChildRefs = ({ yaml, path }) => {
  if (!yaml) return { yaml, path };
  let newYaml = {};

  if (yaml[Object.keys(yaml)[0]].$ref) {
    newYaml = updateRefsOfObject({ yaml, path });
  } else {
    for (const route of Object.keys(yaml)) {
      newYaml[route] = updateRefsOfObject({ yaml: yaml[route], path });
    }
  }

  return { yaml: newYaml };
};

const mergeRefs = (refs) =>
  refs
    .map((ref) => {
      return {
        yaml: YAML.load(_path.join(...sourceFolderPath, ref.$ref)),
        path: ref.$ref,
      };
    })
    .map(fixPathForChildRefs)
    .reduce((result, obj) => {
      const { yaml } = obj;
      if (!yaml) return result;

      for (const key of Object.keys(yaml)) {
        result[key] = yaml[key];
      }

      return result;
    }, {});

const newPaths = mergeRefs(paths);
const newParameters = mergeRefs(parameters);
const newSchemas = mergeRefs(schemas);
const newResponses = mergeRefs(responses);

source.paths = newPaths;
source.components.parameters = newParameters;
source.components.schemas = newSchemas;
source.components.responses = newResponses;

const doc = YAML.stringify(source);

fs.writeFileSync(argv.out, doc);
