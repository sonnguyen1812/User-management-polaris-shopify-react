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

    const getNextUserId = (users) => {
        return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    };

    const addUser = (user) => {
        setUsers(prevUsers => [...prevUsers, { ...user, id: getNextUserId(prevUsers) }]);
    };

    const deleteUser = (userId) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    };

    const addPost = (post) => {
        setPosts(prevPosts => [...prevPosts, post]);
    };

    const editPost = (postId, updatedPost) => {
        setPosts(prevPosts => prevPosts.map(post =>
            post.id === postId ? { ...post, ...updatedPost } : post
        ));
    };

    const deletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    const addAlbum = (album) => {
        setAlbums(prevAlbums => [...prevAlbums, album]);
    };

    const editAlbum = (albumId, updatedAlbum) => {
        setAlbums(prevAlbums => prevAlbums.map(album =>
            album.id === albumId ? { ...album, ...updatedAlbum } : album
        ));
    };

    const deleteAlbum = (albumId) => {
        setAlbums(prevAlbums => prevAlbums.filter(album => album.id !== albumId));
    };

    const addTodo = (todo) => {
        setTodos(prevTodos => [...prevTodos, todo]);
    };

    const editTodo = (todoId, updatedTodo) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === todoId ? { ...todo, ...updatedTodo } : todo
        ));
    };

    const deleteTodo = (todoId) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    };

    const updateTodo = (todoId, updatedFields) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === todoId ? { ...todo, ...updatedFields } : todo
        ));
    };

    return (
        <UserContext.Provider value={{
            users, setUsers,
            posts, setPosts,
            albums, setAlbums,
            todos, setTodos,
            comments, setComments,
            photos, setPhotos,
            addUser, deleteUser,
            addPost, editPost, deletePost,
            addAlbum, editAlbum, deleteAlbum,
            addTodo, editTodo, deleteTodo,
            updateTodo
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
