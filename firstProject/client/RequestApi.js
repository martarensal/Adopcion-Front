import {BASE_URL} from './ApiConfiguration';

export function addRequest(requestCreationRequest, token) {
  console.log(JSON.stringify(requestCreationRequest))
  return fetch(`${BASE_URL}/requests`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(requestCreationRequest),
  });
}