import React, { useEffect } from 'react';
import './index.css';
import { Login } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { useAuthContext } from './hooks';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Sidebar, Header } from './components/user/common';
import { TabProvider } from './contexts';

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
        <Route path="/dashboard/*" element={<UserRoutes />} />
      </Route>
      
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

const TestComponentDash : React.FC = () => {
  return (
      <div>
        Test
      </div>
  );
};

const TestComponentDash2 : React.FC = () => {
  return (
      <div>
          <h1>Dashboard22</h1>
      </div>
  );
};


export const UserRoutes : React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <TabProvider>
          <Sidebar />   
        </TabProvider>
      </div>

      <div className="flex-1 overflow-y-auto">
        <TabProvider>
          <Header />                     
          <Routes>
            
            <Route path="/" element={<TestComponentDash />} />
            <Route path="/test" element ={<TestComponentDash2 />} />

          </Routes>
        </TabProvider>
      </div>
      
    </div>
);
}

export default App;
