import { BASE_URL } from "./ApiConfiguration";

export function getAC(token) {
   
    return fetch(`${BASE_URL}/cities/autonomousCommunity`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
    });
  }

export function getProvincesFromAC(autonomous_community, token) {
    return fetch(`${BASE_URL}/cities/${autonomous_community}/provinces`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
    });
  }


export function getCityFromProvince(province, token) {
  console.log(province)
    return fetch(`${BASE_URL}/cities/${province}/names`, {
      method: 'GET',
      headers: new Headers({
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': token,
      }),
    });
  }
