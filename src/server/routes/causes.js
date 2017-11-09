const express = require('express');
const admin = require('firebase-admin');
const errors = require('./errors');

module.exports = function(app) {
  const causesRoutes = express.Router();
  const db = admin.database();

  app.use('/causes', causesRoutes);

  let throwError = (res, message) => res.json({'error': message});

  let causesRef = db.ref('causes/');

  causesRoutes.get('/', (req, res) => {
    causesRef
    .once('value')
    .then((snapshot) => res.json(snapshot.val()))
    .catch(() => throwError(res, errors.DATABASE_ERROR));
  });
};