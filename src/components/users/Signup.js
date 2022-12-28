import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async(e) =>{
        e.preventDefault();

        const user = {
            email,
            password,
        };

        fetch('/user', {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json'
              }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response =>{
            if (response.mssg === 'Success'){
                navigate('/login');
            }
            else{
                setErrorMessage(response.mssg);
            }
        });
    }
 
  return (
    <main >        
        <section>
            <div>
                <div>                  
                    <h1> Register </h1>                                                                            
                    <form>                                                                                            
                        <div>
                            <label htmlFor="email-address">
                                Email address
                            </label>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>

                        {errorMessage && <div className="error"> {errorMessage} </div>}                                     
                    </form>
                   
                    <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup