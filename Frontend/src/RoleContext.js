import React, { createContext } from 'react';
import Cookies from 'js-cookie';
export const RoleContext = createContext();

export const RoleContextProvider = ({ children }) => {
  const role = Cookies.get('role'); // Implement your logic to get the role from the cookie

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
};