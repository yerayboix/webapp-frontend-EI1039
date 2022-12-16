import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Login from './components/users/Login';
import Profile from './components/users/Profile';

 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
export default App;