import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBRow,
    MDBCol,
    MDBSpinner
  }
  from 'mdb-react-ui-kit';

const Signup = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [submitIsLoading, setSubmitIsLoading] = useState('');

    const onSubmit = async (e) =>{
      setSubmitIsLoading(true);
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
        setSubmitIsLoading(false);
          if (response.mssg === 'Success'){
              navigate('/login');
          }
          else{
              setErrorMessage(response.mssg);
          }
      });
  }
 
  return (
    <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="h1 fw-bold mb-0" style={{letterSpacing: '1px'}}>Registrarse</h2>
              <p className="text-grey-50 mb-3">Por favor introduce tu correo y contraseña!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email' id='email' type='email' onChange={(e) => setEmail(e.target.value)}  
                                required value={email} size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Contraseña' id='password' type='password' onChange={(e) => setPassword(e.target.value)}
                                required value={password} size="lg"/>
              
              {!submitIsLoading ? (
                <MDBBtn type='submit' onClick={onSubmit} className="btn btn-dark btn-lg btn-block" size='lg' >
                  Registrate!
                </MDBBtn>
              ) : (
                <MDBBtn disabled type='submit' onClick={onSubmit} className="btn btn-dark btn-lg btn-block" size='lg' >
                  <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                  Loading...
                </MDBBtn>
              )}

              {errorMessage && <div className="error"> {errorMessage} </div>} 
              <hr className="my-4" />
              <p>
                  Ya tienes una cuenta?{' '}
                  <NavLink to="/login" >
                      Inicia sesión
                  </NavLink>
              </p>    
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </section>
  );
}

export default Signup