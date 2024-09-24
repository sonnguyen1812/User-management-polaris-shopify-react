import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import UserManagement from "./pages/UserManagement";
import UserDetail from "./components/user/UserDetail";
import PostDetail from "./components/post/PostDetail";
import AlbumDetail from "./components/album/AlbumDetail";
import UserPosts from "./components/post/UserPosts";
import UserAlbums from "./components/album/UserAlbums";
import UserTodos from "./components/todo/UserTodos";
import AllPosts from "./components/navigation/AllPosts";
import AllAlbums from "./components/navigation/AllAlbums";
// import AllTodos from "./components/navigation/AllTodos";
import NotFoundPage from "./pages/NotFoundPage";
import "@shopify/polaris/build/esm/styles.css";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <AppProvider i18n={{}}>
      <MainLayout>
        <Routes>
          <Route path="/" exact element=<UserManagement /> />
          <Route path="/user/:id" element=<UserDetail /> />
          <Route path="/user/:userId/posts/:postId" element=<PostDetail /> />
          <Route path="/user/:userId/albums/:albumId" element=<AlbumDetail /> />
          <Route path="/user/:id/posts" element=<UserPosts /> />
          <Route path="/user/:id/albums" element=<UserAlbums /> />
          <Route path="/user/:id/todos" element=<UserTodos /> />
          <Route path="/posts" element=<AllPosts /> />
          <Route path="/albums" element=<AllAlbums /> />
          {/*<Route path="/todos" element=<AllTodos /> />*/}
          <Route path="*" element=<NotFoundPage /> />
        </Routes>
      </MainLayout>
    </AppProvider>
  );
}

export default App;
