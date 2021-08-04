import { BASE_URL } from "./ApiConfiguration";

export function getTypes(token) {
   
    return fetch(`${BASE_URL}/type`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
    });
  }