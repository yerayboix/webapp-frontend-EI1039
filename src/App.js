import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import Signup from './components/users/Signup';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
export default App;