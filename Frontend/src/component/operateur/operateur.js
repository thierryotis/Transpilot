import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

var token = Cookies.get('jwt')

export function getOperateur(id) {
  return axios.get(`${serverUrl}/api/operateur/getoperateur/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
      }
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getOperateurs() {
  return axios.get(`${serverUrl}/api/operateur/getoperateurs`,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.operateurs)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateOperateur(id, data) {
  return axios.put(`${serverUrl}/api/operateur/updateoperateur/${id}`, data,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function deleteOperateur(id) {
  return axios.delete(`${serverUrl}/api/operateur/deleteoperateur/${id}`,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}
