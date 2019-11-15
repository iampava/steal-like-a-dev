module.exports = () => ({
    mode: 'development',
    entry: './App.jsx',
    devtool: 'source-map',
    output: {
        publicPath: '/',
        filename: 'bundle.js'
    }
});
