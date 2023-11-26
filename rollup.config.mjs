// rollup.config.mjs
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts', // Entry point of your TypeScript and React code
  output: [
    // {
    //   file: 'dist/bundle.js',
    //   format: 'cjs', // CommonJS format, but you can choose others like 'esm' for ES modules
    //   sourcemap: true,
    // },
    {
      file: 'dist/bundle.cjs.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    // Resolve node_modules dependencies
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),

    // Convert CommonJS modules to ES6
    commonjs(),

    // Compile TypeScript to JavaScript
    typescript({
      tsconfig: 'tsconfig.json', // Path to your TypeScript configuration file
    }),

    // Transpile JavaScript and JSX code using Babel
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }),
  ],
  external: ['react', 'react-dom'], // Specify external dependencies to prevent bundling them
};
