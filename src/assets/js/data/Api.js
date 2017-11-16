import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

import Firebase from '~/Firebase';

const cookies = new Cookies();

const db = Firebase.database();

/**
 * Request a list of all causes.
 */
export const getCausesRef = () =>
  db.ref('/causes')

/**
 * Reuest a list of public figures
 */
 export const getPublicFigureResults = () =>
  db.ref('/publicFigures')

/**
 * Request information about a given Cause.
 * @param {String} causeId The ID of the cause to fetch
 */
export const getCause = (causeId) =>
  db.ref('/causes').child(causeId);

/**
 * Request information about a given Figure.
 * @param {String} figureId The ID of the figure to fetch
 */
export const getPublicFigure = (figureId) =>
db.ref('/publicFigures').child(figureId);