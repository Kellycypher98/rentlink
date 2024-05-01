import { createContext, useContext, useState } from 'react';

export const CoreStoreContext = createContext();

export const useCoreStore = () => {
  return useContext(CoreStoreContext);
}

export const CoreStoreProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const isAdmin = roles.some(role => AuthorizationManager.isAdmin(role));

  return (
    <CoreStoreContext.Provider value={{ roles, setRoles, notifications, setNotifications, isAdmin }}>
      {children}
    </CoreStoreContext.Provider>
  );
}
