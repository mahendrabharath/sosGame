var webpack = require("webpack");
var helpers = require("./utility");

module.exports = {
    devtool: "inline-source-map",

    resolve: {
        extensions: [ "jsx", ".js" ]
    },

    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },

            {
                test: /\.html$/,
                use: "html-loader"
            },

            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [ "raw-loader", "sass-loader" ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: "null-loader"
            },
            {
                test: /\.css$/,
                exclude: helpers.root("src", "app"),
                use: "null-loader"
            },
            {
                test: /\.css$/,
                include: helpers.root("src", "app"),
                use: "raw-loader"
            }
        ]
    },

    plugins: [

    ]
};