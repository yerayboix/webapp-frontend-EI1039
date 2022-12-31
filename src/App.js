import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Signup from './components/users/Signup';
import Login from './components/users/Login';
import Profile from './components/users/Profile';
import ChangePswd from './components/users/ChangePswd';


 
function App() {
  return (
    <>
    <Router>
      <div>
        <section>                              
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/changepswd" element={<ChangePswd/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
    </>
  );
}
export default App;