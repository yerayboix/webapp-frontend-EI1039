import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { NavLink, useNavigate } from 'react-router-dom'
 
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            //Este navigate es temporal
            navigate("/profile")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
            <main >
            <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{borderRadius: '1rem'}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                    alt="login form" className="img-fluid" style={{borderRadius: '1rem 0 0 1rem'}} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">

                                    <form>

                                    <div className="d-flex align-items-center mb-3 pb-1">
                                        <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                                        <span className="h1 fw-bold mb-0">Login</span>
                                    </div>

                                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                                    <div className="form mb-4">
                                        <label className="form-label" htmlFor="email-address">Email address</label>
                                        <input type="email" id="email-address" className="form-control form-control-lg" 
                                                        onChange={(e)=>setEmail(e.target.value)}/>                                        
                                    </div>

                                    <div className="form mb-4">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" required className="form-control form-control-lg"
                                                        onChange={(e)=>setPassword(e.target.value)} />                                        
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={onLogin} >Login</button>
                                    </div>
                                    
                                    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? {' '}
                                        <NavLink to="/signup">
                                            Sign up
                                        </NavLink>
                                    </p>
                                    </form>

                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                

            </main>
        </>
    )
}
 
export default Login;