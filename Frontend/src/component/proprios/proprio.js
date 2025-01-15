import axios from 'axios';
import { serverUrl } from '../../server';

export function getProprio(id) {
    return axios.get(`${serverUrl}/api/proprio/getproprio/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
  
  export function getProprios() {
    return axios.get(`${serverUrl}/api/proprio/getproprios`)
      .then(response => response.data.proprios)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
  
  export function updateProprio(id, data) {
    return axios.put(`${serverUrl}/api/proprio/updateproprio/${id}`, data)
      .then(response => response.data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }
  
  export function deleteProprio(id) {
    return axios.delete(`${serverUrl}/api/proprio/deleteproprio/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(error);
        throw error;
      });
  }