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
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBIcon,
  MDBSwitch
} from 'mdb-react-ui-kit';

export default function ConfigUbication({ubication, response}) {
  const [basicModal, setBasicModal] = useState(false);

  const [currentSwitch, setCurrentSwitch] = useState(ubication.services[1]);
  const [ticketSwitch, setTicketSwitch] = useState(ubication.services[2]);

  const handleCurrentSwitch = () => {
    setCurrentSwitch(!currentSwitch);
  }

  const handleTicketSwitch = () => {
    setTicketSwitch(!ticketSwitch);
  }

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
    <MDBIcon className="position-absolute top-0 end-0 m-3" icon='cog' onClick={toggleShow} />
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
        <MDBModalDialog size="md" centered>
          <MDBModalContent>
          <MDBModalHeader >
                <MDBModalTitle >Configuración {ubication.name}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <h6>Gestionar servicios</h6>
                <MDBSwitch checked={ticketSwitch} onChange={handleTicketSwitch} label='Eventos' />
                <br />
                <MDBSwitch checked={currentSwitch} onChange={handleCurrentSwitch} label='Noticias' />
                <br />
                <MDBRow>
                    <MDBCol size="6">
                        <MDBBtn className="mb-2" style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} >Guardar Cambios</MDBBtn>
                    </MDBCol>                    
                    <MDBCol size="6">
                        <MDBBtn style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} >Eliminar Ubicacion</MDBBtn>
                    </MDBCol>
                </MDBRow>
                
                
                
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}