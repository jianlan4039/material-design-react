// rollup.config.mjs
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';

export default {
    input: 'src/index.ts', // Entry point of your TypeScript and React code
    output: [
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

        sass({insert: false, output: 'dist/styles.css'}), // Add the Sass plugin

        // Transpile JavaScript and JSX code using Babel
        babel({
            exclude: 'node_modules/**',
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            babelHelpers: 'bundled',
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
        }),
        // Copy SVG files to dist directory
        copy({
            targets: [
                { src: 'src/**/*.svg', dest: 'dist/' }
            ]
        })
    ],
    external: ['react', 'react-dom'], // Specify external dependencies to prevent bundling them
};
