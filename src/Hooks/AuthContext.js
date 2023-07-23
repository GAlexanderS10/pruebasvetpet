import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  const setRole = (role) => {
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ userRole, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
