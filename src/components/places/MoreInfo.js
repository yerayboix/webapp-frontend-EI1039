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
} from 'mdb-react-ui-kit';

export default function MoreInfo({ubication, response}) {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const listTM = response.Ticketmaster.map((ticket) => {
    return <>
              <h6 className="text-center">{ticket.name} - {ticket.dates.start.localDate} </h6>
              <MDBModalBody >
                <MDBRow >
                  <MDBCol className='col-md-8'><p>Rango de precios standar: {ticket.priceRanges[0].min}-{ticket.priceRanges[0].max}€</p>
                <p>Link: <a href='{ticket.url}'>{ticket.url} </a></p></MDBCol>
                  <MDBCol className='ms-auto col-example' centered><img src={ticket.images[0].url} width="200px"/></MDBCol>
                </MDBRow>
                
                
              </MDBModalBody>
              
      <hr />
    </>
  });

  const listCU = response.Currents.map((current) => {
    return <>
                <h6 className="text-center">"{current.title}"</h6>
              <MDBModalBody >                
              <MDBRow >
                <MDBCol className='col-md-12'>{current.description}</MDBCol>
              </MDBRow>
              <MDBCol className='mt-2'>
                <MDBCol className='col-md-6'>{"Autoría: " + current.author}</MDBCol>
                <MDBCol className='ms-auto col-example'>{"Fecha: " + current.published.split("+")[0]}</MDBCol></MDBCol>
                <MDBCol className='col-md-6'><a href={current.url}>Link a la noticia</a></MDBCol>
              </MDBModalBody>
      <hr />
    </>
  });

  const TicketHead = response.Ticketmaster.length !== 0 ? <MDBModalHeader className='mb-4' >
  <MDBModalTitle >Próximos eventos</MDBModalTitle></MDBModalHeader> : "";
  const CurrentHead = response.Currents.length !== 0 ? <MDBModalHeader className='mb-4' >
  <MDBModalTitle >Últimas noticias</MDBModalTitle></MDBModalHeader> : "";

  


  return (

    <>
    <MDBBtn style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} onClick={toggleShow}>Mas informacion</MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
        <MDBModalDialog size="lg" centered>
          <MDBModalContent>
          <MDBModalHeader >
                <MDBModalTitle >Más información sobre {ubication.name}</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              
            {TicketHead}
            {listTM}
            {CurrentHead}
            {listCU}
            </MDBModalBody>

       

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}