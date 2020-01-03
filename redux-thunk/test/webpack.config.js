const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: 'production' }) => {
    return webpackMerge(
        {
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        use: [{ loader: 'babel-loader' }]
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.jsx', '.json']
            },
            devServer: {
                historyApiFallback: true,
                contentBase: path.join(__dirname, 'dist')
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './index.html',
                    inject: 'body',
                    minify: {
                        html5: true,
                        removeComments: true,
                        collapseWhitespace: true
                    }
                }),
                new webpack.ProgressPlugin()
            ]
        },
        modeConfig(mode)
    );
};
