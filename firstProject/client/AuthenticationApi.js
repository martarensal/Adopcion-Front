const PORT = '8080';
const BASE_URL = `http://192.168.0.31:${PORT}`;

export function userLogin(loginRequest) {
  return fetch(`${BASE_URL}/authentication/login`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify(loginRequest),
  });
}