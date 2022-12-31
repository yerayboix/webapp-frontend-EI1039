import React from 'react';
import { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';



export default function Header() {
    const [showBasic, setShowBasic] = useState(false);

  return (
    <><header>
          <MDBNavbar expand='lg' light bgColor='white' sticky>
              <MDBContainer fluid>
                  <MDBNavbarToggler
                      onClick={() => setShowBasic(!showBasic)}
                      aria-controls='navbarExample01'
                      aria-expanded='false'
                      aria-label='Toggle navigation'
                  >
                      <MDBIcon fas icon='bars' />
                  </MDBNavbarToggler>
                  <MDBCollapse show={showBasic} v-model="collapse1" id="navbarSupportedContent">
                  <MDBNavbarNav right className='mb-2 mb-lg-0'>
                      <MDBNavbarItem>
                          <MDBNavbarLink aria-current='page' href='#'>
                              Home
                          </MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                          <MDBNavbarLink href='#'>Buscador</MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                          <MDBNavbarLink href='#'>Perfil</MDBNavbarLink>
                      </MDBNavbarItem>
                      <MDBNavbarItem>
                          <MDBNavbarLink href='#'>Cerrar Sesión</MDBNavbarLink>
                      </MDBNavbarItem>
                  </MDBNavbarNav>
                  
                  </MDBCollapse>
          </MDBContainer>
      </MDBNavbar><div
          className='p-5 text-center bg-image'
          style={{ backgroundImage: "url('https://www.mapfre.es/media/mapfre-545x257-permisos-alquiler-casa-para-hacer-eventos.jpg')", height: 400 }}
      >
              <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                  <div className='d-flex justify-content-center align-items-center h-100'>
                      <div className='text-white'>
                          <h1 className='mb-3'>LocalHost</h1>
                          <h4 className='mb-3'>EI1038</h4>
                      </div>
                  </div>
              </div>
          </div>
    </header></>
  );
}