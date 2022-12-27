import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useEffect } from 'react';


 
const Profile = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(auth.currentUser.email);
    const [userUID, setUserUID] = useState(auth.currentUser.uid);
    const [errorMessage, setErrorMessage] = useState('');
    const [userServices, setUserServices] = useState(null);

    useEffect(() => {
        let entries = {
            userUID,
        };
        fetch("/user",{
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
            console.log(response);
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
            }).catch((error) => {
                console.log(error);
            });
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