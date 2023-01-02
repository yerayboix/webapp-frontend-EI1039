import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function MoreInfo({ubication, response}) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (

    <>
    <MDBBtn style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} onClick={toggleShow}>Mas informacion</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog size="xl" centered>
          <MDBModalContent>
            <MDBModalHeader style={{textAlign: 'center'}}>
              <MDBModalTitle >Noticias</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>
            <MDBModalHeader style={{textAlign: 'center'}}>
              <MDBModalTitle >Eventos</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>s..s</MDBModalBody>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}