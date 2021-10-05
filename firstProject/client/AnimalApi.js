import { BASE_URL } from "./ApiConfiguration";

export function addAnimal( animalCreationRequest, username, token) {
 // console.log(animalCreationRequest)
  return fetch(`${BASE_URL}/users/${username}/animals`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalCreationRequest),
  });

}

export function getPaginatedAnimalsFromUser(page, size, username, token) {
  return fetch(`${BASE_URL}/users/${username}/animals?page=${page}&size=${size}`,{
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
    },
  );
}