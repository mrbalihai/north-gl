const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [
            { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/, },
            { test: /\.glsl$/, use: [ 'raw-loader', 'glslify-loader' ], exclude: /node_modules/ },
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: [ '.ts', '.js', '.glsl' ],
    },
    plugins: [
        new CopyPlugin([
            { from: './assets', to: './assets' },
        ])
    ],
};
