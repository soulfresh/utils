import resolve from '@rollup/plugin-node-resolve';

module.exports = {
  input: [
    'src/index.js',
    'src/colors.js',
    'src/dates.js',
    'src/services.js',
    'src/strings.js',
    'src/urls.js',
  ],
  output: [{
    dir: 'lib/esm',
    format: 'esm',
  }, {
    dir: 'lib/cjs',
    format: 'cjs',
  }],
  plugins: [resolve()],
}
