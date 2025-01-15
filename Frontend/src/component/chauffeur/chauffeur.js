import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

var token = Cookies.get('jwt')

export function getChauffeur(id) {
  return axios.get(`${serverUrl}/api/chauffeur/getchauffeur/${id}`,
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

export function getChauffeurs() {
  return axios.get(`${serverUrl}/api/chauffeur/getchauffeurs`,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.chauffeurs)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateChauffeur(id, data) {
  return axios.put(`${serverUrl}/api/chauffeur/updatechauffeur/${id}`, data,{
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

export function deleteChauffeur(id) {
  return axios.delete(`${serverUrl}/api/chauffeur/deletechauffeur/${id}`,{
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
