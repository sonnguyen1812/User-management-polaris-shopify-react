import React, { createContext, useContext, useState } from 'react';

// Tạo context cho người dùng
const UserContext = createContext();

// Cung cấp context cho các component con
export const UserProvider = ({ children, initialData }) => {
    const [users, setUsers] = useState(initialData.users || []);
    const [posts, setPosts] = useState(initialData.posts || []);
    const [albums, setAlbums] = useState(initialData.albums || []);
    const [todos, setTodos] = useState(initialData.todos || []);
    const [comments, setComments] = useState(initialData.comments || []);
    const [photos, setPhotos] = useState(initialData.photos || []);

    const addUser = (user) => {
        setUsers(prevUsers => [...prevUsers, user]);
    };

    const deleteUser = (userId) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    return (
        <UserContext.Provider value={{ users, setUsers, posts, setPosts, albums, setAlbums, todos, setTodos, comments, setComments, photos, setPhotos, addUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook để sử dụng UserContext
export const useUserContext = () => useContext(UserContext);
