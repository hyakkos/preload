const { merge } = require('webpack-merge');
const common = require('./webpack.base.config');
module.exports = merge(common, {
    mode: 'product',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
});