import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from "firebase/auth";


 
const Profile = () => {

    const navigate = useNavigate();

    const user = auth.currentUser.email;

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