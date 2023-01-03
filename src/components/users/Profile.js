import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from 'react';
import Header from '../body/Header';
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBBtn, MDBSwitch } from 'mdb-react-ui-kit';



const Profile = () => {
    const navigate = useNavigate();
    const localUser = window.localStorage.getItem('email');
    const localUid = window.localStorage.getItem('uid');
    const [user, setUser] = useState(localUser);
    const [userUID, setUserUID] = useState(localUid);
    const [errorMessage, setErrorMessage] = useState('');
    const [userServices, setUserServices] = useState(null);
    const [eventos, setEventos] = useState(false);
    const [noticias, setNoticias] = useState(false);
    
    

  const handleTicketSwitch = () => {
    setEventos(!eventos);
    console.log("HaEve" + eventos)
  }
  const handleCurrentSwitch = () => {
    setNoticias(!noticias);
    console.log("HaNot" + noticias)
  }
    useEffect(() => {
        //Funcion que comprueba si estamos logeados
        const token = localStorage.getItem('uid');
        console.log(token)
        if(token == null){
            navigate('/login');
        }
        //Si esta iniciado sesion continua
        let entries = {
            userUID,
        };
        fetch("/profile",{
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
            if(response.servicesByDefault.length === 3){
                setUserServices(response.servicesByDefault);
                setEventos(response.servicesByDefault[2])
                setNoticias(response.servicesByDefault[1])
            }
            else{
                setErrorMessage(response.mssg);
                navigate('/');
            }
        });
    }, [])

    //This logout function and it's button is temporarly in the profile, it's not their final place
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
                navigate("/");
                console.log("Signed out successfully")
                window.localStorage.clear();
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleEliminateAccount = () => {
        
        let obj = {userUID : localUid}
        fetch("/user/delete",{
            method:'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-type':'application/json'
            },
        }).then(res=>res.json()).catch(e => 
            console.error('Error', e)).then((response) => {
                if(response.mssg == 'Success') {
                    navigate("/login");
                }else {
                    console.log(response);
                }
            });
    }

    const handleChangePaswd = () =>{
        navigate("/changepswd")
    }

    const handleChangeDefault = () =>{
        let obj = {userUID : localUid, weatherService : null, newsService : noticias, eventsService : eventos}
        
        console.log("BotEve" + eventos)
        console.log("BotNot" + noticias)

        fetch("services/default",{
            method: 'POST',
            body: JSON.stringify(obj),
            headers:{
                'Content-type':'application/json'
            },
        }).then(res=>res.json()).catch(e => 
            console.error('Error', e)).then((response) => {
                if(response.mssg == 'Success') {
                    console.log(response);
                }else {
                    console.log(response);
                }
            });
    }

    

    return(
        
        <>
            <Header/>
            <section className="vh-100" style={{backgroundColor: '#9A616D'}}>
            <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
                <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                        <h2 className="h1 fw-bold mb-0" style={{letterSpacing: '1px'}}>Mi perfil:</h2>
                        <p className="text-grey-50 mb-3">Correo electronico: {user}</p>
                        <p className="text-grey-50 mb-3">Servicios por defecto:</p>
                        <p>     
                        <MDBRow>
                            <h6>Servicios por defecto al agregar ubicaciones</h6>
                            <MDBCol>
                                {userServices && <MDBSwitch checked={eventos} onChange={handleTicketSwitch} label='Eventos' />}
                            </MDBCol>
                            <MDBCol>
                                {userServices && <MDBSwitch checked={noticias} onChange={handleCurrentSwitch}  label='Noticias' />} 
                            </MDBCol>
                        </MDBRow>   
                            
                        <MDBBtn type='submit' onClick={handleChangeDefault} className="btn btn-danger btn-lg btn-block" size='lg' style={{borderRadius: '1rem', maxWidth: '300px', left: '50%', transform: 'translateX(-50%)'}}>
                            Guardar preferencias
                        </MDBBtn>
                        </p>
                        <div className='justify-content-center align-items-center' style={{width: '100%'}}>
                        <MDBBtn type='submit' onClick={handleChangePaswd} className="btn btn-warning btn-lg btn-block " size='lg'  style={{borderRadius: '1rem', maxWidth: '300px', left: '50%', transform: 'translateX(-50%)' }} >
                            Cambiar contraseña
                        </MDBBtn>
                        <MDBBtn type='submit' onClick={handleEliminateAccount} className="btn btn-danger btn-lg btn-block" size='lg' style={{borderRadius: '1rem', maxWidth: '300px', left: '50%', transform: 'translateX(-50%)'}}>
                            Eliminar cuenta
                        </MDBBtn>
                        </div>

                    </MDBCardBody>

        
                </MDBCard>
            </MDBCol>
            </MDBRow>
            </MDBContainer>
            </section>
            {/* <nav>
                <p>
                    Welcome to the beta profile, {user} <br></br>
                    Here we can logout, eliminate your account and change your password
                </p>

                <br></br>

                <div>
                    <p> 
                        Here are your services: <br></br>
                        Weather: {userServices && (userServices[0].toString())} <br></br>
                        Events: {userServices && (userServices[1].toString())} <br></br>
                        News: {userServices && (userServices[2].toString())} <br></br>
                    </p>
                </div>
 
                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div>
                    <button onClick={handleEliminateAccount}>
                        Eliminate your account
                    </button>
                </div>
                <div>
                    <button onClick={handleChangePaswd}>
                        Change your password
                    </button>
                </div>
            </nav> */}
        </>
    )
}
 
export default Profile;