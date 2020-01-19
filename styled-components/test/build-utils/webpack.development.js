const path = require('path');
const Autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: 'static/js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [new Autoprefixer()]
                        }
                    }
                ]
            }
        ]
    }
};
