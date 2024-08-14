import React, { useEffect } from 'react';
import { Login } from './pages';
import { Home } from './pages/user';
import { AuthProvider, TabProvider, Tab } from './contexts';
import { useAuthContext, useTabContext } from './hooks';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, Header } from './components';

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
    <TabProvider>
      <Routes>
        <Route element={<SecureRoutes />}>
          <Route path="/dashboard/*" element={<UserRoutes />} />
        </Route>
        
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </TabProvider>
    
  );
}

const TestComponentDash2 : React.FC = () => {
  return (
      <div>
          <h1>Dashboard22</h1>
      </div>
  );
};


export const UserRoutes : React.FC = () => {
  const { setActiveTab } = useTabContext();

  const navigate = useNavigate();

  function handleTabChange(key : Tab) {
    setActiveTab(key);
    navigate(key.toString());
  }

  return (
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 bg-white shadow-md">
            <Sidebar handleTabChange={handleTabChange}/>   
        </div>

        <div className="flex-1 overflow-y-auto">
            <Header />                   
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/accounts" element ={<TestComponentDash2 />} />
              </Routes>
            </main> 
        </div>
        
      </div>
);
}

export default App;
