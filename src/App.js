import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home, Profile, FriendProfile } from './pages';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<FriendProfile />} />
      </Routes>
    </div>
  );
}

export default App;
