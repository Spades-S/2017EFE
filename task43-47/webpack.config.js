const path = require('path')
const webpack = require('webpack')
module.exports = {
    entry: './app/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'app/dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './app/dist'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
        })
    ],
    module:{
        rules:[{
            test:/\.scss$/,
            use:[{
                loader:'style-loader'
            },{
                loader:'css-loader'
            },{
                loader:'sass-loader'
            }]
        }]
    }
}
