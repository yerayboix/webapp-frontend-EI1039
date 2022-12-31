import React from 'react';
import { useState } from "react";
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';



export default function Header() {
    const [showBasic, setShowBasic] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
                navigate("/login");
                console.log("Signed out successfully")
                window.localStorage.clear();
            }).catch((error) => {
                console.log(error);
            });
    }

  return (
    <>
        <MDBNavbar expand='lg' light bgColor='dark' sticky>
        <MDBContainer className='d-flex justify-content-start' fluid>
          <MDBNavbarBrand className='d-flex justify-content-start' bgcolor='light' href='#'><MDBIcon color='light' fas icon="home"/></MDBNavbarBrand>
        </MDBContainer>
        <MDBContainer className='d-flex justify-content-end' id='logged'>
            <MDBNavbarBrand className='d-flex justify-content-start' href='/profile'><MDBIcon color='white' fas icon="user" /></MDBNavbarBrand>
            <MDBNavbarBrand className='d-flex justify-content-start' type='button'><MDBIcon onClick={handleLogout} color='danger' fas icon="sign-out-alt" /></MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar></>
  );
}