import { BASE_URL } from "./ApiConfiguration";

export function addAnimal(username, name, sex, age, colour, city, type, image, token) {
  return fetch(`${BASE_URL}/${username}/animals`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
      Accept: 'application/json',
    }),
    body: JSON.stringify(
        {
          name: name,
          sex: sex,
          age: age,
          colour: colour,
          city: city,
          type: type,
          image: image,
        }
    ),
  });
}