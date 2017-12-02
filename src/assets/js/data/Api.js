import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';
import Q from 'q';

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
 * Request a list of all supporters of petition.
 */
export const getSupportForPetition = (petitionId) =>
  db.ref('/petitions').child(petitionId).child('supportingUsers');

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
 * Request a list of all causes.
 * @param {String} userId The ID of the user who's settings to fetch
 */
export const getUserSettings = (userId) =>
db.ref('/userSettings/' + userId)

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

/**
 * Get the list of supporting users for a particular cause
 * @param {String} causeId The ID of the cause to fetch
 */
export const getSupportingUsers = (causeId) =>
db.ref('/causes').child(causeId).child('supportingUsers');

/**
* Get the list of opposing users for a particular cause
* @param {String} causeId The ID of the cause to fetch
*/
export const getOpposingUsers = (causeId) =>
  db.ref('/causes').child(causeId).child('opposingUsers');

/**
 * Get the user settings object associated with a particular user
 * @param {String} userId The ID of the user to fetch
 */
export const getUserSetting = (userId) =>
  db.ref('/userSettings').child(userId);

/**
 * Get the causes that a given user supports
 * @param {String} userId The ID of the user
 */
export const getUserSupportingCauses = (userId) =>
  db.ref('causes')
  .once('value')
  .then(snapshot => {
    let causes = snapshot.val();
    return Object.keys(causes)
    .reduce((obj, curr) => {
      if(Object.values(causes[curr]['supportingUsers']).indexOf(userId) 
        === -1) {
        return obj;
      }
      return {...obj, [curr]: causes[curr]};
    }, {});
  });