import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AppProvider} from '@shopify/polaris';
import UserManagement from './pages/UserManagement';
import UserDetail from './components/user/UserDetail';
import PostDetail from './components/post/PostDetail';
import AlbumDetail from './components/album/AlbumDetail';
import UserPosts from "./components/post/UserPosts";
import UserAlbums from "./components/album/UserAlbums";
import UserTodos from "./components/todo/UserTodos";
import '@shopify/polaris/build/esm/styles.css';
import MainLayout from "./components/MainLayout";


function App() {
    return (
        <AppProvider i18n={{}}>
            <MainLayout>
                <Routes>
                    <Route path="/" exact element=<UserManagement/> />
                    <Route path="/user/:id" element=<UserDetail/> />
                    <Route path="/user/:userId/posts/:postId" element=<PostDetail/> />
                    <Route path="/user/:userId/albums/:albumId" element=<AlbumDetail/> />
                    <Route path="/user/:id/posts" element=<UserPosts /> />
                    <Route path="/user/:id/albums" element=<UserAlbums /> />
                    <Route path="/user/:id/todos" element=<UserTodos /> />
                </Routes>
            </MainLayout>
        </AppProvider>
    );
}

export default App;
