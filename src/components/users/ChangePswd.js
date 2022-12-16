import React, {useState} from 'react';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom'
 
const ChangePswd = () => {
    const navigate = useNavigate();
    const [newpassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const onChangePswd = (e) => {
        e.preventDefault();
        let userUID = auth.currentUser.uid

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
        <>
            <main >        
                <section>
                    <div>                                            
                        <p> Change Password </p>                       
                                                       
                        <form>                                              
                            <div>
                                <label htmlFor="new-password">
                                    New Password
                                </label>
                                <input
                                    id="new-password"
                                    name="new-password"
                                    type="password"   
                                    minLength="6"                                 
                                    required                                                                                
                                    placeholder="New Password"
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onChangePswd}                                        
                                >
                                    Change Password                                                                  
                                </button>
                                {errorMessage && <div className="error"> {errorMessage} </div>}
                            </div>                               
                        </form>                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default ChangePswd;