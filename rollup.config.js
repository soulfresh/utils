import resolve from '@rollup/plugin-node-resolve';
import glob from 'glob';

import pkg from './package.json';

const inputs = glob.sync('./src/**/!(*.test|*.spec).js')
  // Also skip example folders or files.
  .filter(f => f.indexOf('example') === -1);

console.log('---- MATCHES ----');
console.log(inputs);

const external = Object.keys(pkg.peerDependencies || {})
  .concat(Object.keys(pkg.optionalDependencies || {}));

module.exports = {
  input: [
    'src/index.js',
    'src/colors.js',
    'src/dates.js',
    'src/services.js',
    'src/strings.js',
    'src/urls.js',
  ],
  external: external,
  output: [{
    dir: 'lib/esm',
    format: 'esm',
  }, {
    dir: 'lib/cjs',
    format: 'cjs',
  }],
  plugins: [resolve()],
}
