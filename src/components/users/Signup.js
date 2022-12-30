import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';

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
    <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="h1 fw-bold mb-0" style={{letterSpacing: '1px'}}>Sign up</h2>
              <p className="text-grey-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' onChange={(e) => setEmail(e.target.value)}  
                                required value={email} size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' onChange={(e) => setPassword(e.target.value)}
                                required value={password} size="lg"/>

              <MDBBtn className="btn btn-dark btn-lg btn-block" size='lg' onClick={onSubmit}>
                Sign up
              </MDBBtn>

              {errorMessage && <div className="error"> {errorMessage} </div>} 
              <hr className="my-4" />
              <p>
                        Already have an account?{' '}
                        <NavLink to="/login" >
                            Log in
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