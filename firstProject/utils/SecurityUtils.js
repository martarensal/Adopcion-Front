import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('ApiKeyAuth');
    //console.log('Estoy en getToken ' + token);
    return token;
  } catch (error) {
    console.error(error);
  }
}

function tokenInfo() {
  return getToken().then(token => jwt_decode(token));
}

function authorizeApi(params, apiFunction) {
  return getToken().then(token => apiFunction(...params, token));
}

async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }
}

async function deleteToken() {
  try {
    await AsyncStorage.removeItem('ApiKeyAuth');
  } catch (e) {
    console.log(e);
  }
}

var SecurityUtils = {
  getToken: getToken,
  tokenInfo: tokenInfo,
  authorizeApi: authorizeApi,
  clearAll: clearAll,
  deleteToken: deleteToken,
};

module.exports = SecurityUtils;