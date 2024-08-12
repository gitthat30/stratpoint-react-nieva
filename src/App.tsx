import React, { useEffect } from 'react';
import './index.css';
import { Login } from './components/Login';
import { AuthProvider, useAuthContext } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';

const TestComponent2: React.FC = () => {
  const { handleLogout, email} = useAuthContext();
  return (
    <div>
      Logged In {email}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

function App() {

  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}


function SecureRoutes() {
  const { isAuthenticated, email } = useAuthContext();

  useEffect(() => {
    console.log('SecureRoutes rendered. isAuthenticated:', isAuthenticated);
    console.log('SecureRoutes rendered. email:', email);
  }, [isAuthenticated]);


  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
function AppRoutes() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Routes>
      <Route element={<SecureRoutes />}>
        <Route path="/dashboard" element={<TestComponent2 />} />
      </Route>
      
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
