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
 * Request a list of all active petitions.
 */
export const getPetitionsRef = () =>
  db.ref('/petitions')

/**
 * Request a list of public figures
 */
 export const getPublicFigureResults = () =>
  db.ref('/publicFigures')

/**
 * Request a list of events
 */
export const getEventsRef = () =>
    db.ref('/events')

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

/**
 * Request information about a given Event.
 * @param {String} eventId The ID of the event to fetch
 */
export const getEvent = (eventId) =>
  db.ref('/events').child(eventId);

/**
 * Request information about a given News article.
 * @param {String} newsId The ID of the article to fetch
 */
export const getNews = (newsId) =>
  db.ref('/news').child(newsId);