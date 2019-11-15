module.exports = () => ({
    mode: 'production',
    entry: ['./App.jsx'],
    devtool: 'none',
    output: {
        publicPath: '/dist/',
        filename: 'test-app.[contenthash].js'
    }
});
