const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[id].[contenthash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [new Autoprefixer()]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            // css-nano docs
            cssProcessorOptions: {
                map: {
                    inline: false,
                    annotation: true
                }
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css'
        }),
        new CopyWebpackPlugin([
            {
                from: 'public/',
                to: '.',
                ignore: ['service-worker.js']
            }
        ])
    ]
};
