import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

var token = Cookies.get('jwt')

export function getChargement(id) {
  return axios.get(`${serverUrl}/api/chargement/getchargement/${id}`, {
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

export function getChargements() {
  return axios.get(`${serverUrl}/api/chargement/getchargements`, {
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.chargements)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateChargement(id, data) {
  return axios.put(`${serverUrl}/api/chargement/updatechargement/${id}`, data, {
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

export function deleteChargement(id) {
  return axios.delete(`${serverUrl}/api/chargement/deletechargement/${id}`,{
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
