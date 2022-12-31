import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from 'react';
import Header from '../body/Header';



const Profile = () => {
    console.log(window.localStorage)
    const navigate = useNavigate();
    const localUser = window.localStorage.getItem('email');
    const localUid = window.localStorage.getItem('uid');
    const [user, setUser] = useState(localUser);
    const [userUID, setUserUID] = useState(localUid);
    const [errorMessage, setErrorMessage] = useState('');
    const [userServices, setUserServices] = useState(null);
    
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

    }

    const handleChangePaswd = () =>{
        navigate("/changepswd")
    }

    return(
        
        <>
            <Header/>
            <nav>
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
            </nav>
        </>
    )
}
 
export default Profile;