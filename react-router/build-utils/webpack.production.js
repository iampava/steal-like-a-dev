module.exports = () => ({
    mode: 'production',
    entry: ['./test/App.jsx'],
    devtool: 'none',
    output: {
        publicPath: '/dist/',
        filename: 'test-app.[contenthash].js'
    }
});
