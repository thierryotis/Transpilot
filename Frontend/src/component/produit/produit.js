import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';


const token = Cookies.get('jwt')
export function getProduit(id) {
  return axios.get(`${serverUrl}/api/produit/getproduit/${id}`,{
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

export function getProduits() {
  return axios.get(`${serverUrl}/api/produit/getproduits`,{
    headers: {
      Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
    }
  })
    .then(response => response.data.produits)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

export function updateProduit(id, data) {
  return axios.put(`${serverUrl}/api/produit/updateproduit/${id}`, data,{
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

export function deleteProduit(id) {
  return axios.delete(`${serverUrl}/api/produit/deleteproduit/${id}`,{
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
