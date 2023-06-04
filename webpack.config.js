const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: 'development',
  entry: "./index.ts",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: "ts-loader",
        include: [
          path.resolve(__dirname),
          path.resolve(__dirname, "../../../nav.generated"),
          path.join(__dirname, "../../../sections/"),
        ],
        exclude: [path.join(__dirname, "node_modules")],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      filename: path.join(__dirname, "build/index.html"),
    }),
  ],
  devServer: {
    static: path.join(__dirname),
    devMiddleware: {
      publicPath: "/",
    },
    compress: true,
    host: "localhost",
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: false,
      logging: 'error',
    }
  },
  output: {
    path: path.join(__dirname, "build"),
    publicPath: ".",
    filename: "bundle.js",
    hashFunction: "sha256",
  },
};
