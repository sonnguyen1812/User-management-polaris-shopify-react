import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ initialData, children }) => {
    return (
        <UserContext.Provider value={initialData}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
