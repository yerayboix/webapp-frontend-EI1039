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

console.log("ubication")
console.log(ubication)
console.log(ubication.services[1])
console.log("response")
console.log(response)

const toggleShow = () => setBasicModal(!basicModal);

let ticket = []
if(JSON.stringify(response.Ticketmaster) === '{}'){
  ticket = []
}
else ticket = response.Ticketmaster

let current = []
if(JSON.stringify(response.Currents) === '{}'){
  current = []
}
else current = response.Currents

const listTM = ticket.map((ticket) => {
    return <>
    <h6 className="text-center">{ticket.name} - {ticket.dates.start.localDate} </h6>
    <MDBModalBody >
      <MDBRow >
        <MDBCol className='col-md-8'>{ticket.hasOwnProperty('priceRanges') &&  <p>Rango de precios standar: {ticket.priceRanges[0].min}-{ticket.priceRanges[0].max}€</p>}
      <a target="_blank" rel="noopener noreferrer" href={ticket.url}>Compra tus entradas aqui!</a></MDBCol>
        <MDBCol className='ms-auto col-example' centered><img src={ticket.images[0].url} width="200px"/></MDBCol>
      </MDBRow>
      
      
    </MDBModalBody>

    <hr /></>  
   
  });

  const listCU = current.map((current) => {
      return  <>
      <h6 className="text-center">"{current.title}"</h6>
    <MDBModalBody >                
    <MDBRow >
      <MDBCol className='col-md-12'>{current.description}</MDBCol>
    </MDBRow>
    <MDBCol className='mt-2'>
      <MDBCol className='col-md-6' style={{paddingTop: '1rem'}}><figcaption class="blockquote-footer">{"Autor: " + current.author}</figcaption></MDBCol>
      <MDBCol className='ms-auto col-example'><figcaption class="blockquote-footer">{"Fecha: " + current.published.split("+")[0]}</figcaption></MDBCol></MDBCol>
      <MDBCol className='col-md-6'><figcaption class="blockquote-footer"><a target="_blank" rel="noopener noreferrer" href={current.url}>Link a la noticia</a></figcaption></MDBCol>
    </MDBModalBody>
<hr /></> 

  });

  const TicketHead = ticket.length !== 0 ? <MDBModalHeader className='mb-4' >
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