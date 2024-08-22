import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, Frame } from '@shopify/polaris';
import UserManagement from './pages/UserManagement';
import UserDetail from './components/UserDetail';
import PostDetail from './components/PostDetail';
import AlbumDetail from './components/AlbumDetail';
import '@shopify/polaris/build/esm/styles.css';
import MainLayout from "./components/MainLayout";

function App() {
  return (
      <AppProvider
          i18n={{}}
      >

          <MainLayout>
          <Frame>
            <Routes>
              <Route path="/" exact element=<UserManagement /> />
              <Route path="/user/:id" element=<UserDetail/> />
              <Route path="/user/:userId/posts/:postId" element=<PostDetail/> />
              <Route path="/user/:userId/albums/:albumId" element=<AlbumDetail/> />
            </Routes>
          </Frame>
            </MainLayout>

      </AppProvider>
  );
}

export default App;
