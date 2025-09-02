const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Кастомный плагин для управления production файлами
class ProductionAssetsPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('ProductionAssetsPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'ProductionAssetsPlugin',
        (data, cb) => {
          // Добавляем CSS и JS файлы только для production
          if (compiler.options.mode === 'production') {
            data.html = data.html.replace(
              '<!-- PRODUCTION_CSS_PLACEHOLDER -->',
              '<link rel="stylesheet" href="./widget-catalog.css" />'
            );
            data.html = data.html.replace(
              '<!-- PRODUCTION_JS_PLACEHOLDER -->',
              '<script src="./widget-catalog.js"></script>'
            );
          } else {
            // Убираем плейсхолдеры для development
            data.html = data.html.replace('<!-- PRODUCTION_CSS_PLACEHOLDER -->', '');
            data.html = data.html.replace('<!-- PRODUCTION_JS_PLACEHOLDER -->', '');
          }
          cb(null, data);
        }
      );
    });
  }
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "widget-catalog.js",
      library: "WidgetCatalog",
      libraryTarget: "umd",
      libraryExport: "default",
      globalObject: "this",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                api: "modern",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "widget-catalog.css",
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
      }),
      new ProductionAssetsPlugin(),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 3000,
      hot: true,
    },
    // Если мы используем React и ReactDOM в другом проекте, то можно добавить
    // externals: {
    //   "react": "React",
    //   "react-dom": "ReactDOM",
    // },
  };
};
