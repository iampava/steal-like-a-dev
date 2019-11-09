module.exports = () => ({
    mode: 'development',
    entry: './test/App.jsx',
    devtool: 'source-map',
    output: {
        publicPath: '/',
        filename: 'bundle.js'
    }
});
