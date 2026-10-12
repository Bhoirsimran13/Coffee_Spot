
import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

export default function App() {
  const [page, setPage] = useState('home');

  return page === 'home' ? (
    <HomeScreen
      onOpenCamera={() => setPage('camera')}
    />
  ) : (
    <CameraScreen
      onBack={() => setPage('home')}
    />
  );
}