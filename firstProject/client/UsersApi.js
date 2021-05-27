const PORT = '8080';
const BASE_URL = `http://192.168.0.31:${PORT}`;

export function addUser(userRegistrationRequest) {
  return fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify(userRegistrationRequest),
  });
}

export function getUser(username, token) {
  return fetch(`${BASE_URL}/users/${username}`, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
  });
}

export function modifyUserUsername(userUsernameChangeRequest, username, token) {
  return fetch(`${BASE_URL}/users/${username}/username`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(userUsernameChangeRequest),
  });
}
export function modifyUserName(userNameChangeRequest, username, token) {
  return fetch(`${BASE_URL}/users/${username}/name`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(userNameChangeRequest),
  });
}
export function modifyUserLastname(userLastnameChangeRequest, username, token) {
  return fetch(`${BASE_URL}/users/${username}/lastnames`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(userLastnameChangeRequest),
  });
}
export function modifyUserEmail(userEmailChangeRequest, username, token) {
  return fetch(`${BASE_URL}/users/${username}/email`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(userEmailChangeRequest),
  });
}
export function modifyUserPassword(userPasswordChangeRequest, username, token) {
  return fetch(`${BASE_URL}/users/${username}/password`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(userPasswordChangeRequest),
  });
}
