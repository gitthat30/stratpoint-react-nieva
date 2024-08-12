import React, { useEffect } from 'react';
import './index.css';
import { Login } from './pages';
import { AuthProvider } from './contexts/AuthContext';
import { useAuthContext } from './hooks';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './components/user/common/Sidebar';
import { TabProvider } from './contexts';

// const TestComponent2: React.FC = () => {
//   const { handleLogout, email} = useAuthContext();
//   return (
//     <div>
//       Logged In {email}
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

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
          <TabProvider>
            <Sidebar />
          </TabProvider>
          <h1>Dashboard</h1>
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

    <div className="flex-1 overflow-y-auto">
      {/* <header className="bg-white shacdow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </div>
      </header> */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<TestComponentDash />} />
          <Route path="/test" element ={<TestComponentDash2 />} />
          {/* <Route path="home" element={<HomeView />} />
          <Route path="accounts" element={<AccountManagement />} />
          <Route path="transactions" element={<TransactionsView />} />
          <Route path="store-purchase" element={<StorePurchase />} />
          <Route path="notifications" element={<NotificationsView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="settings" element={<SettingsView />} /> */}
        </Routes>
      </main>
    </div>
  </div>
  );
}

export default App;
