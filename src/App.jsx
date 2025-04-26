// App.jsx
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes';
console.log("🔗 Axios baseURL:", import.meta.env.VITE_API_URL);


const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;