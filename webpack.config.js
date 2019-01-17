const path = require('path');

module.exports = {
    entry: './src/popup.js',
    mode: 'development',
    devtool: 'source-map',
    watch:true,
    output: {
        // This copies each source entry into the extension dist folder named
        // after its entry config key.
        path: path.join(path.resolve(__dirname), 'extension', 'dist'),
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map',
    },
    module: {
        // This transpiles all code (except for third party modules) using Babel.
        rules: [{
            exclude: /node_modules/,
            test: /\.(js|jsx)$/,
            // Babel options are in .babelrc
            use: ['babel-loader'],
        }],
    },
}