const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");

const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("ExtractTextPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin"); // eslint 사용할 경우

const isDevelopment = process.env.NODE_ENV !== "production";
const envPath = `./.env.${isDevelopment ? "development" : "production"}`;

dotenv.config({
  path: envPath,
});

const config = {
  // name: "React18-webpack-babel-setting", // 설정 이름
  mode: "development", // production, development // 설정 모드
  devtool: "eval",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    // 개발 서버 설정
    static: "./dist",
    port: 3000,
    hot: true, // 핫 모듈 교체(HMR) 활성화
    compress: true,
    open: true,
    historyApiFallback: true,
    // host 지정
    host: "0.0.0.0",
    client: {
      overlay: true,
      // 웹소켓용 url 지정
      webSocketURL: "ws://0.0.0.0:80/ws",
    },
  },
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
          @import 'src/assets/style/function.scss';
        `,
      },
    },
  },
};
module.exports = config;
