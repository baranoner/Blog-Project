import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import PostDetailPage from "./pages/PostDetailPage";
import EditPostPage from "./pages/EditPostPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreatePage />} />
          <Route path=":category" element={<HomePage />} />
          <Route path="post/:id" element={<PostDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
