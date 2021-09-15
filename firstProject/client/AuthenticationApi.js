import { BASE_URL } from "./ApiConfiguration";

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