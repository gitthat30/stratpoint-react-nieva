import React, { useEffect } from 'react';
import { Login } from './pages';
import { Home, Account, StorePurchase, Transactions, Notifications, Profile, Settings } from './pages/user';
import { AuthProvider, TabProvider, Tab, SettingsProvider } from './contexts';
import { useAuthContext, useSettingsContext, useTabContext } from './hooks';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, Header } from './components';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className='dark'>
          <AppRoutes />
        </div>
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
      <SettingsProvider>
        <Routes>
          <Route element={<SecureRoutes />}>
            <Route path="/dashboard/*" element={<UserRoutes />} />
          </Route>
          
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </SettingsProvider>
    </TabProvider>
    
  );
}

export const UserRoutes : React.FC = () => {
  const { setActiveTab } = useTabContext();

  const { settings } = useSettingsContext();
  const navigate = useNavigate();

  function handleTabChange(key : Tab) {
    setActiveTab(key);
    navigate(key.toString());
  }

  return (
    <div className={settings.darkMode ? 'dark' : 'light'}>
      <div className="flex h-screen bg-background">
        <div className="w-50 bg-sidebar">
            <Sidebar handleTabChange={handleTabChange}/>   
        </div>

        <div className="flex-1 overflow-y-auto">
            <Header />                   
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Navigate to ="/dashboard/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/accounts" element={<Account />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/store-purchase" element={<StorePurchase />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main> 
        </div>
      </div>
    </div>
);
}

export default App;
