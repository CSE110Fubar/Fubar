import Cookies from 'universal-cookie';
import nocache from 'superagent-no-cache';
import pref from 'superagent-prefix';
import request from 'superagent';

import {promisify} from './helpers';

const API_URL_PREFIX = '/api';

const apiPrefix = pref(API_URL_PREFIX);
const cookies = new Cookies();

/**
 * Request a list of all causes.
 * @returns {Promise} A promise of the request.
 */
export const loadAllCauses = () =>
  promisify(request
    .get('/causes')
    .use(apiPrefix));

/**
 * Request information about a given Cause.
 * @param {String} causeId The ID of the cause to fetch
 * @returns {Promise} A promise of the request
 */
export const loadCause = (causeId) =>
  promisify(request
    .get('/causes/' + causeId)
    .use(apiPrefix));