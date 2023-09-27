import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './routes/Posts';
import SignUp from './routes/SignUp';
import ResetPassword from './routes/ResetPassword';
import Post from './routes/Post';
import AcceptInvite from './routes/AcceptInvites';
import ForgotPassword from './routes/ForgotPassword';
import Editpost from './routes/EditPost';
import AddPost from './routes/AddPost';
import SignIn from './routes/SignIn';
import React from 'react';
import './App.css';

function App() {
  return (
    <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/accept-invite" element={<AcceptInvite />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/edit-post/:id" element={<Editpost />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  );
}

export default App;
