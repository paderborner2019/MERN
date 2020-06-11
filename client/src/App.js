import React from 'react';
import "materialize-css";
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hooks';
import { AuthContext } from './context/authContext';
import { Navbar } from './components/navBar';

function App() {
  const {token,login,logout,userId} = useAuth()
  const isAuthenication =!!token
  const routes = useRoutes(isAuthenication)
  return (
    <AuthContext.Provider value={{
      token,login,logout,userId
    }}>
      <BrowserRouter>
      {isAuthenication && <Navbar/>}
      <div className="container">
        <h1>{routes}</h1>
      </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
