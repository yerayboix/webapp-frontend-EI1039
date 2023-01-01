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

const PlaceAddedPopup = () => {
  const [staticModal, setStaticModal] = useState(false);

  const toggleShow = () => setStaticModal(!staticModal);

  return (
    <>
      <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <h3>Ubicacion añadida con éxito.</h3>
            </MDBModalBody>
            <MDBModalFooter style={{display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <MDBBtn className='center'>Volver a la página de inicio</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
export default PlaceAddedPopup;