import axios from 'axios';
import { serverUrl } from '../../server';
import Cookies from 'js-cookie';


const token = Cookies.get('jwt')
export function getLieux() {
    return axios.get(`${serverUrl}/api/lieu/getlieus`,{
      headers: {
        Authorization: `Bearer ${token}` // Ajoute le token dans l'en-tête Authorization de la requête
      }
    })
      .then(response => response.data.lieus)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }