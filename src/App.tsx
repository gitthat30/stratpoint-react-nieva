import React, { useEffect } from 'react';
import { Login } from './pages';
import { Home, Account, StorePurchase, Transactions, Notifications, Profile, Settings } from './pages/user';
import { AuthProvider, TabProvider, Tab, SettingsProvider } from './contexts';
import { useAuthContext, useSettingsContext, useTabContext } from './hooks';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, Header } from './components';
import { slide as Menu } from 'react-burger-menu';
import { Register } from './pages/Register';

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
  const { isAuthenticated, user } = useAuthContext();

  useEffect(() => {
    console.log('SecureRoutes rendered. isAuthenticated:', isAuthenticated);
    console.log('SecureRoutes rendered. email:', user);
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
          <Route path="/register" element={<Register />} />
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
      <div className="fixed h-15 p-4 bg-sidebar w-full lg:hidden grid grid-cols-2 items-center">
            <h1 className="inline-block text-2xl font-bold text-blue-600">DigiWallet</h1>
      </div>
      <div className="flex h-screen bg-background">
        <div className="lg:hidden bg-sidebar">
          <Menu burgerBarClassName='bg-card-text' className='bg-sidebar' burgerButtonClassName='fixed right-4' pageWrapId='page-wrap' noOverlay>
            <Sidebar handleTabChange={handleTabChange} />
          </Menu>
        </div>

        <div className="w-64 bg-sidebar hidden lg:block">
            <Sidebar handleTabChange={handleTabChange}/>   
        </div>

        <div className="flex-1 overflow-y-auto pt-16">
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
