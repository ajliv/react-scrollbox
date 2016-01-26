module.exports = {
    entry: "./src/ScrollBox.js",
    output: {
        path: './dist',
        filename: 'react-scrollbox.js',
        libraryTarget: 'umd',
        library: 'Scrollbox',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel"
        }, {
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.less$/,
            loader: "style!css!autoprefixer!less"
        }]
    }
};
