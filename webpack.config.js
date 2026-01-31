const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); 

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/weather-app/",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Add this
    },
    port: 8080,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|avif|webp)$/i, 
        type: 'asset/resource',
      },
    ],
  },
};