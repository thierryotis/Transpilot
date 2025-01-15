import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';


var token = Cookies.get('jwt')

export function getDechargement(id) {
  return axios.get(`${serverUrl}/api/dechargement/getdechargement/${id}`, {
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

export function getDechargements() {
  return axios.get(`${serverUrl}/api/dechargement/getdechargements`, {
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.dechargements)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateDechargement(id, data) {
  return axios.put(`${serverUrl}/api/dechargement/updatedechargement/${id}`, data, {
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

export function deleteDechargement(id) {
  return axios.delete(`${serverUrl}/api/dechargement/deletedechargement/${id}`, {
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
