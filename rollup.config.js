import typescript from 'rollup-plugin-typescript2';
import NodeBuiltins from 'rollup-plugin-node-builtins';
import NodeGlobals from 'rollup-plugin-node-globals';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const typescriptPlugin = typescript({
  tsconfig: 'tsconfig.build.json',
});

const nodeBuiltins = NodeBuiltins();
const nodeGlobalsPlugin = NodeGlobals();

const external = [/@babel\/runtime/, 'axios'];

const babelPlugin = babel({
  extensions:   ['.js', '.ts'],
  babelHelpers: 'runtime',
  exclude:      'node_module/**',
  babelrc:      true,
  plugins:      [
    '@babel/plugin-transform-runtime'
  ],
  presets:      [
    '@babel/preset-env', {},
  ],
});

export default [
  // UMD
  {
    external,
    input:  'src/index.ts',
    output: {
      file:    'dist/index.umd.js',
      format:  'umd',
      name:    'HttpClient',
      indent:   false,
      globals: {
        axios: 'axios',
      },
    },
    plugins: [
      typescriptPlugin,
      nodeBuiltins,
      nodeGlobalsPlugin,
      babelPlugin,
      resolve({ preferBuiltins: true }),
    ],
  },
  // UMD minified
  {
    external,
    input:  'src/index.ts',
    output: {
      file:    'dist/index.umd.min.js',
      format:  'umd',
      name:    'HttpClient',
      indent:  false,
      globals: {
        axios: 'axios',
      },
    },
    plugins: [
      typescriptPlugin,
      nodeBuiltins,
      nodeGlobalsPlugin,
      babelPlugin,
      resolve({ preferBuiltins: true }),
      terser(),
    ],
  },
];
