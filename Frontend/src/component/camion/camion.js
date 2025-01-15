import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';

const token = Cookies.get('jwt')

export function getCamion(id) {
  return axios.get(`${serverUrl}/api/camion/getcamion/${id}`, {
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

export function getCamions() {
  var prestataire_id = -1
  if(arguments.length >0){ prestataire_id = arguments[0];}
  return axios.post(`${serverUrl}/api/camion/getcamions`,{prestataire_id:prestataire_id},{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.camions)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateCamion(id, data) {
  return axios.put(`${serverUrl}/api/camion/updatecamion/${id}`, data,{
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

export function deleteCamion(id) {
  return axios.delete(`${serverUrl}/api/camion/deletecamion/${id}`,{
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


export function getBennes() {
  var prestataire_id = -1
  if(arguments.length >0){ prestataire_id = arguments[0];}
  return axios.post(`${serverUrl}/api/camion/getbennes`,{prestataire_id:prestataire_id},{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.camions)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getTracteurByPrestataire(prestataire_id) {
  //let prestataire_id = -1
  if(arguments.length >0){ prestataire_id = arguments[0];}
  return axios.get(`${serverUrl}/api/tracteur/gettracteurbyprestataire/${prestataire_id}`,{},{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.tracteurs)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function getBennesByPrestataire(prestataire_id) {
  //let prestataire_id = -1
  if(arguments.length >0){ prestataire_id = arguments[0];}
  return axios.get(`${serverUrl}/api/benne/getbennebyprestataire/${prestataire_id}`,{},{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.bennes)
    .catch(error => {
      console.error(error);
      throw error;
    });
}