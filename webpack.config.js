const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCssPresetEnv = require('postcss-preset-env');

module.exports = {
    output: {
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        stats: 'minimal',
        host: process.env.HOST, // use 0.0.0.0 to make it available on network
        port: process.env.PORT,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'doStart',
            template: 'src/template.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            useBuiltIns: 'entry'
                        }]
                    ]
                }
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 15000,
                        name: "[name].[hash:8].[ext]"
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                PostCssPresetEnv({
                                    stage: 0
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    }
};
