const express = require('express');
const firebase = require('firebase');

module.exports = function(app) {
  const routes = express.Router();
  const apiRoutes = express.Router();

  app.use('/', routes);
  app.use('/api', apiRoutes);

  // Development Hot-Middleware
  if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config.js');

    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      hot: false,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      },
      watchOptions: {
        poll: true
      }
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
      publicPath: '/',
    }));
  }

  routes.get('/', (req, res) => {
    return res.render('index');
  });
};