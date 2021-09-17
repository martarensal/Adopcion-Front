import { BASE_URL } from "./ApiConfiguration";

export function addAnimal(/*name, sex, age, size, colour, city, type, image,*/ animalCreationRequest, username, token) {
  console.log(animalCreationRequest)
  return fetch(`${BASE_URL}/users/${username}/animals`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
      'X-API-KEY': token,
    }),
    body: JSON.stringify(animalCreationRequest
        /*{
          age: age,
          city_id: city,
          colour: colour,
          image: image,
          name: name,
          sex: sex,
          size: size,
          status:'HOMELESS',
          type_id: type,
        }
        */
    ),
  });

}