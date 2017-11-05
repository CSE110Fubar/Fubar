const express = require('express');
const admin = require('firebase-admin');

module.exports = function(app) {
  const routes = express.Router();
  const apiRoutes = express.Router();

  const db = admin.database();

  app.use('/', routes);
  app.use('/api', apiRoutes);

  routes.get('/', (req, res) => {
    // Get cause data
    db.ref('/').on('value', (snapshot) => {
      return res.render('index', {value: snapshot.val()});
    });
  });

  apiRoutes.get('/home', (req, res) => {
    return res.json({'apiHome': true});
  });
};