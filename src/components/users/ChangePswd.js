import React, {useState} from 'react';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
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
import Header from '../body/Header';
 
const ChangePswd = () => {
    const navigate = useNavigate();
    const [newpassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const onChangePswd = (e) => {
        e.preventDefault();
        let userUID = window.localStorage.getItem('uid');

        const entries = {
            userUID,
            newpassword,
        };

        fetch("/user/password",{
            method:'POST',
            body: JSON.stringify(entries),
            headers:{
                'Content-type':'application/json'
            },
        }).then(res=>res.json())
        .catch(error => console.error('Error:',error))
        .then(response =>{
            if (response.mssg === 'Success'){
                navigate('/');
            }
            else{
                setErrorMessage(response.mssg);
            }
        });
       
    }
 
    return(
        <main>
            <Header></Header>
                
    <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
        <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>

            <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                <h2 className="h1 fw-bold mb-0" style={{letterSpacing: '1px'}}>Cambiar Contraseña</h2>
                <p className="text-grey-50 mb-3">Por favor, introduce tu nueva contraseña!</p>

                <MDBInput wrapperClass='mb-4 w-100' label='Contraseña' id='new-password' type='password' onChange={(e) => setNewPassword(e.target.value)}
                                    required value={newpassword} minLength="6" size="lg"/>

                <MDBBtn type='submit' onClick={onChangePswd} className="btn btn-warning btn-lg btn-block " size='lg'  style={{borderRadius: '1rem', maxWidth: '300px', left: '50%', transform: 'translateX(-50%)' }} >
                            Cambiar contraseña
                            {errorMessage && <div className='justify-content-center align-items-center error' style={{width: '100%', color:'red'}}>
                     <p >{errorMessage} </p>
                </div>}
                        </MDBBtn>
                </MDBCardBody>
            </MDBCard>

            </MDBCol>
        </MDBRow>

        </MDBContainer>
        </section>
            </main>
    )
}
 
export default ChangePswd;