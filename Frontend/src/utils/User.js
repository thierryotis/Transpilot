import axios from 'axios';
import Cookie from 'js-cookie';
import { serverUrl } from '../server';

export async function getCurrentUserRole() {
  try {
    // Read the JWT token from local storage or wherever it is stored
    const token = Cookie.get('jwt');

    // Make a request to the server to check if the user is authenticated
    const response = await axios.post(`${serverUrl}/api/user/role`,'null', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    // Extract the user role from the response data
    const userRole = response.data.role;

    // Return the user role
    return userRole;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
