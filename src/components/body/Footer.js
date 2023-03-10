import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
        </section>

        <section className='mb-4'>
        <MDBRow evenly center>
            <MDBCol size='4'>
            Yeray Boix Torner
            </MDBCol>
            <MDBCol size='4'>
            Pablo Gozalbo Solsona
            </MDBCol>
        </MDBRow>
        <MDBRow evenly center>
            <MDBCol size='4'>
            Alvaro Morales Guevara
            </MDBCol>
            <MDBCol size='4'>
            Marc Navarro Gaya
            </MDBCol>
        </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright: Universitat Jaume I        
      </div>
    </MDBFooter>
  );
}