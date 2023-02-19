import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';


function App() {
 const uctx=useContext(AuthContext )
 return (
    <React.Fragment>
   
      <MainHeader  />
      <main> 
        {!uctx.isLoggedIn && <Login />}
        {uctx.isLoggedIn && <Home/>}
      </main>
      
    </React.Fragment>
  );
}

export default App;
