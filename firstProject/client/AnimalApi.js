import { BASE_URL } from "./ApiConfiguration";

export function addAnimal( animalCreationRequest, username, token) {
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

export function modifyAnimalName(AnimalNameChangeRequest, idAnimal, token) {
      console.log(AnimalNameChangeRequest)
  return fetch(`${BASE_URL}/animals/${idAnimal}/name`, {
      method: 'PUT',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
      body: JSON.stringify(AnimalNameChangeRequest),
    });
}

export function modifyAnimalAge(animalAgeChangeRequest, idAnimal, token) {
  return fetch(`${BASE_URL}/animals/${idAnimal}/age`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalAgeChangeRequest),
  });
}

export function modifyAnimalSex(animalSexChangeRequest, idAnimal, token) {
  return fetch(`${BASE_URL}/animals/${idAnimal}/sex`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalSexChangeRequest),
  });
}

export function modifyAnimalColour(animalColourChangeRequest, idAnimal, token) {
  return fetch(`${BASE_URL}/animals/${idAnimal}/colour`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalColourChangeRequest),
  });
}

export function modifyAnimalStatus(animalStatusChangeRequest, idAnimal, token) {
  return fetch(`${BASE_URL}/animals/${idAnimal}/status`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalStatusChangeRequest),
  });
}

export function modifyAnimalSize(animalSizeChangeRequest, idAnimal, token) {
  return fetch(`${BASE_URL}/animals/${idAnimal}/size`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalSizeChangeRequest),
  });
}

export function deleteAnimal(idAnimal, token) {
  return fetch(`${BASE_URL}/animals/${idAnimal}`, {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),

  });
}