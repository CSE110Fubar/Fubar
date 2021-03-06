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
 * Request an active petitions.
 */
export const getPetitionRef = (petitionId) =>
  db.ref('/petitions').child(petitionId)

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
 * Request information about a given petition.
 * @param {String} figureId The ID of the figure to fetch
 */
export const getPetition = (petitionId) =>
db.ref('/petitions').child(petitionId);

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
          if (!causes[curr]['supportingUsers']) return obj;
          if (Object.values(causes[curr]['supportingUsers']).indexOf(userId)
            === -1) {
            return obj;
          }
          return { ...obj, [curr]: causes[curr] };
        }, {});
    });

/**
 * Get the causes that a given user opposes
 * @param {String} userId The ID of the user
 */
export const getUserOpposingCauses = (userId) =>
db.ref('causes')
  .once('value')
  .then(snapshot => {
    let causes = snapshot.val();
    return Object.keys(causes)
      .reduce((obj, curr) => {
        if (!causes[curr]['opposingUsers']) return obj;
        if (Object.values(causes[curr]['opposingUsers']).indexOf(userId)
          === -1) {
          return obj;
        }
        return { ...obj, [curr]: causes[curr] };
      }, {});
  });

/**
 * Adds a cause to the list of causes that the user is following.
 * @param {String} userId The ID of the user
 * @param {String} causeId The ID of the cause
 */
export const userFollowCause = (userId, causeId) => {
  let settings = getUserSettings(userId);
  return settings
    .once('value')
    .then(snapshot => {
      let followedCauses = snapshot.val().followedCauses;

      if (followedCauses && Object.values(followedCauses).indexOf(causeId) !== -1) {
        return;
      }

      let newFollow = settings.child('followedCauses').push();
      newFollow.set(causeId);
    });
}

export const userUnfollowCause = (userId, causeId) => {
  let causes = getUserSettings(userId)
    .child('followedCauses');

  return causes.once('value')
    .then((snapshot) => {
      let val = snapshot.val();
      if (val === null) return;
      Object.keys(val).forEach((key) => {
        if (val[key] == causeId) {
          causes.child(key).remove();
        }
      })
    });
}

/**
 * Returns a promise that contains whether a user is following a given cause
 * @param {String} userId The ID of the user
 * @param {String} causeId The ID of the cause
 */
export const getUserFollowing = (userId, causeId) =>
  getUserSettings(userId)
  .once('value')
  .then(snapshot => snapshot.val())
  .then(settings => settings.followedCauses && 
    Object.values(settings.followedCauses).indexOf(causeId) !== -1)

/**
 * Get the causes that match a search query
 * @param {String} query The search query
 */
export const getCausesSearchResults = (query) =>
  db.ref('/causes')
  .once('value')
  .then(snapshot => snapshot.val())
  .then(causes =>
    Object.keys(causes)
      .reduce((obj, curr) => {
        if (causes[curr].name.toLowerCase().indexOf(query.toLowerCase())
          === -1) {
          return obj;
        }
        return { ...obj, [curr]: causes[curr] };
      }, {})
  );

/**
 * Get the public figures that match a search query
 * @param {String} query The search query
 */
export const getPublicFiguresSearchResults = (query) =>
  db.ref('/publicFigures')
  .once('value')
  .then(snapshot => snapshot.val())
  .then(figures =>
    Object.keys(figures)
      .reduce((obj, curr) => {
        if (figures[curr].name.toLowerCase().indexOf(query.toLowerCase())
          === -1) {
          return obj;
        }
        return { ...obj, [curr]: figures[curr] };
      }, {})
  );

/**
 * Get the petitions that match a search query
 * @param {String} query The search query
 */
export const getPetitionsSearchResults = (query) =>
  db.ref('/petitions')
  .once('value')
  .then(snapshot => snapshot.val())
  .then(petitions =>
    Object.keys(petitions)
      .reduce((obj, curr) => {
        if (petitions[curr].name.toLowerCase().indexOf(query.toLowerCase())
          === -1) {
          return obj;
        }
        return { ...obj, [curr]: petitions[curr] };
      }, {})
  );

  
