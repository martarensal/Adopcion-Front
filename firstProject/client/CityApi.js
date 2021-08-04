import { BASE_URL } from "./ApiConfiguration";

export function getCities(cityPaginatedResponse, token) {
    return fetch(`${BASE_URL}/cities`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
      body: JSON.stringify(cityPaginatedResponse),
    });
  }
