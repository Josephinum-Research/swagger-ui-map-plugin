const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = (env, argv) => ({
    entry: './src/index.js',
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'swagger-ui-map-plugin.js',
        globalObject: 'this',
        library: {
            name: "swagger-ui-map-plugin",
            type: "umd"
        },
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ],
    },
    externals: [
        {
            react: 'react'
        },
        /^ol$|^ol\/.*$/i
    ],
    plugins: argv.mode === 'development' ? [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        })
    ] : []
});