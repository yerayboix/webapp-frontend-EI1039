import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useState } from "react";

 
const Profile = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [userServices, setUserServices] = useState('');


    const user = auth.currentUser.email;
    const userUID = auth.currentUser.uid;

    const entries = {
        userUID,
    };

    fetch("/user",{
        method:'GET',
        body: JSON.stringify(entries),
        headers:{
            'Content-type':'application/json'
        },
    }).then(res=>res.json()).catch(error => console.error('Error:',error))
    .then(response=>{
        if(Object.keys(response.mssg).length===3){
            setUserServices(response.mssg);
        }
        else{
            setErrorMessage(response.mssg);
            navigate('/');
        }
    });

    const handleLogout = () => {

    }

    const handleEliminateAccount = () => {

    }

    const handleChangePaswd = () =>{
    }

    return(
        <>
            <nav>
                <p>
                    Welcome to the beta profile, {user} <br></br>
                    Here we can logout, eliminate your account and change your password
                </p>

                <br></br>

                <div>
                    <p> 
                        Here are your services: <br></br>
                        Weather: {userServices[0]} <br></br>
                        Events: {userServices[1]} <br></br>
                        ?¿: {userServices[2]} <br></br>
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