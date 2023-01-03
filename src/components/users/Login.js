import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../body/Footer';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol
  }
  from 'mdb-react-ui-kit';
 
const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            // Signed in
            console.log(userCredential);
            const user = userCredential.user;
            console.log(user);
            window.localStorage.setItem('email', user.email);
            window.localStorage.setItem('uid', user.uid);
            await fetchUserData(window.localStorage.getItem('uid'));
            //Este navigate es temporal
            navigate("/profile");
        })
        .catch((error) => {
            setErrorMessage(error.message);
        });
    }

    async function fetchUserData(uid) {
      let entries = {
        userUID: uid,
    };
      await fetch("/places/all",{
        method:'POST',
        body: JSON.stringify(entries),
        headers:{
            'Content-type':'application/json'
        },
    }).then(res=>res.json())
    .catch(error => 
        console.error('Error:',error)
        )
    .then((response)=>{
        if(response.mssg === 'Success'){
            window.localStorage.setItem('ubications', JSON.stringify(response.data));
        }
        else{
            console.log(response.mssg);
        }
    });
    }
    
 
    return(
        <>
    <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="h1 fw-bold mb-0" style={{letterSpacing: '1px'}}>Iniciar sesión</h2>
              <p className="text-grey-50 mb-3">Por favor introduce tu correo y contraseña!</p>

              <form onSubmit={onLogin}>
                <MDBInput wrapperClass='mb-4 w-100' label='Email' id='email' type='email' onChange={(e) => setEmail(e.target.value)}  
                                  required value={email} size="lg"/>
                <MDBInput wrapperClass='mb-4 w-100' label='Contraseña' id='password' type='password' onChange={(e) => setPassword(e.target.value)}
                                  required value={password} size="lg"/>

                <MDBBtn type='submit' className="btn btn-dark btn-lg btn-block" size='lg' >
                  Log in
                </MDBBtn>
              </form>

              {errorMessage && <div className="error"> {errorMessage} </div>} 
              <hr className="my-4" />
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>No tienes una cuenta? {' '}
                                        <NavLink to="/signup">
                                            Registrate
                                        </NavLink>
                                    </p>   
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </section>
            <Footer />
        </>
    )
}
 
export default Login;