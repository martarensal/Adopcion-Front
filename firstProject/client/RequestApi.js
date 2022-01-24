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

export function getPaginatedRequestFromUser(page, size, username, token) {
  return fetch(
    `${BASE_URL}/users/${username}/requests?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
    },
  );
}

export function deleteRequest(idRequest, token) {
  return fetch(`${BASE_URL}/requests/${idRequest}`, {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
  });
}

export function modifyRequestStatus(requestStatusChangeRequest, idRequest, token) {
  return fetch(`${BASE_URL}/requests/${idRequest}/requestStatus`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(requestStatusChangeRequest),
  });
}