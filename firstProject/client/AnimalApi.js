import {BASE_URL} from './ApiConfiguration';

export function addAnimal(animalCreationRequest, username, token) {
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
  return fetch(
    `${BASE_URL}/users/${username}/animals?page=${page}&size=${size}`,
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

export function modifyAnimalName(AnimalNameChangeRequest, idAnimal, token) {
  console.log(AnimalNameChangeRequest);
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

export function modifyAnimalType(animalTypeChangeRequest, idAnimal, token) {
  console.log(animalTypeChangeRequest + ' animal type change EDNPOINT');
  return fetch(`${BASE_URL}/animals/${idAnimal}/type`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalTypeChangeRequest),
  });
}

export function modifyAnimalCity(animalCityChangeRequest, idAnimal, token) {
  console.log(animalCityChangeRequest);
  return fetch(`${BASE_URL}/animals/${idAnimal}/city`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalCityChangeRequest),
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

export function modifyAnimalImage(animalImageChangeRequest, idAnimal, token) {
  return fetch(`${BASE_URL}/animals/${idAnimal}/image`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalImageChangeRequest),
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

export function searchAnimals(
  animalSize,
  sex,
  colour,
  minAge,
  maxAge,
  idCity,
  idType,
  page,
  size,
  token,
) {
  let url = new URL('/animals/filters', BASE_URL);
  if (animalSize) url.searchParams.append('animalSize', animalSize);
  if (sex) url.searchParams.append('sex', sex);
  if (colour) url.searchParams.append('colour', colour);
  if (minAge) url.searchParams.append('minAge', minAge);
  if (maxAge) url.searchParams.append('maxAge', maxAge);
  if (idCity) url.searchParams.append('idCity', idCity);
  if (idType) url.searchParams.append('idType', idType);
  url.searchParams.append('page', page);
  url.searchParams.append('size', size);
 console.log(url)
 console.log(arguments)
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
  });
}
export function addPublication(publicationCreationRequest, token) {
  return fetch(`${BASE_URL}/publications`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(publicationCreationRequest),
  });
}

export function getPaginatedPublications(page, size, token) {
  return fetch(
    `${BASE_URL}/publications?page=${page}&size=${size}`,
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

export function getMyPublications(username, page, size, token) {
  return fetch(
    `${BASE_URL}/user/${username}/publications?page=${page}&size=${size}`,
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

export function deletePublication(idPublication, token) {
  return fetch(`${BASE_URL}/publications/${idPublication}`, {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
  });
}

export function modifyDescription(PublicationDescriptionChangeRequest, idPublication, token) {
  console.log(PublicationDescriptionChangeRequest);
  return fetch(`${BASE_URL}/publications/${idPublication}/description`, {
    method: 'PUT',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(AnimalNameChangeRequest),
  });
}