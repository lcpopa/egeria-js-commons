import {
  handleResponse,
  authHeader
} from '../auth';

import { API_URL, REQUEST_TIMEOUT } from '../commons/constants';

const egeriaFetch = (uri: string, method : string, headers : any, options: any) => {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();

    const event = new CustomEvent('EGERIA_API_ERROR', { 'detail': {'message': 'Request timed out.'} });
    document.dispatchEvent(event);
  }, REQUEST_TIMEOUT);

  const requestOptions: any = {
    method: method,
    headers: headers,
    signal: controller.signal,
    ...options
  };

  return fetch(`${API_URL}${uri}`, requestOptions).then((response: any) => {
    clearTimeout(timeoutId);

    return handleResponse(response);
  }).catch((error: any) => {
    console.error(`Error:`, error);
  });
}

/*
 * @param uri is the full URL
 * @param method usual fetch methods such as 'GET', 'POST', etc.
 * @param callback this is an optional callback function that can be used
 *                 in a different context to get the response and manage it
 *                 in a custom manner
 * @returns
 */
const fetchData = async (uri: string, method: string, callback?: Function) => {
  const res = await egeriaFetch(uri, method, {...authHeader()}, {});
  const data = await res ? res.json() : null;

  if(callback) {
    callback(data);
  } else {
    return data;
  }
};

export {
  egeriaFetch,
  fetchData
};