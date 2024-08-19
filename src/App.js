import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, Frame } from '@shopify/polaris';
import UserManagement from './pages/UserManagement';
import UserDetail from './components/UserDetail';
import PostDetail from './components/PostDetail';
import AlbumDetail from './components/AlbumDetail';
import TodoDetail from './components/TodoDetail';
import '@shopify/polaris/build/esm/styles.css';
import MainLayout from "./components/MainLayout";

function App() {
  return (
      <AppProvider
          i18n={{}}
      >
        <Router>
          <MainLayout>
          <Frame>
            <Routes>
              <Route path="/" exact element=<UserManagement /> />
              <Route path="/user/:id" exact element=<UserDetail/> />
              <Route path="/user/:id/posts/:postId" element=<PostDetail/> />
              <Route path="/user/:id/albums/:albumId" element=<AlbumDetail/> />
              <Route path="/user/:id/todos" element=<TodoDetail/> />
            </Routes>
          </Frame>
            </MainLayout>
        </Router>
      </AppProvider>
  );
}

export default App;
