import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

 
const Profile = () => {

    const navigate = useNavigate();

    const user = auth.currentUser.email;


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