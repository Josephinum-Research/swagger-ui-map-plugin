const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = (env, argv) => ({
    entry: './src/index.js',
    mode: 'production',
    devtool: argv.mode === 'development' ? 'source-map' : false,
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
    externalsType: 'window',
    externals: [
        {
            react: 'react',
        },
        ({ context, request }, callback) => {
            if (/^ol\//i.test(request)) {
                const path = request.replace(/^ol\//, '');
                if (path.startsWith('source/GeoTIFF') || path.startsWith('layer/WebGLTile')) {
                    return callback();
                }
                return callback(null, request.split('/'));
            }
            callback();
        },
    ],
    plugins: argv.mode === 'development' ? [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        })
    ] : []
});
