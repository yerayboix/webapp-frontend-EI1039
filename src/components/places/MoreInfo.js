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

let ticket = []
if(JSON.stringify(response.Ticketmaster) === '{}'){
  ticket = []
}
else ticket = response.Ticketmaster

const listTM = ticket.map((ticket) => {
    return <>
              <h6 className="text-center">{ticket.name} - {ticket.dates.start.localDate} </h6>
              <MDBModalBody key={ubication.name.toString() + '_' + ticket.name.toString() + '_' + ticket.dates.start.localDate.toString()}>
                <MDBRow key={ubication.name.toString() + '_' + ticket.name.toString() + '_' + ticket.dates.start.localDate.toString() + '_' + ticket.priceRanges[0].min.toString()}>
                  <MDBCol key={ubication.name.toString() + '_' + ticket.name.toString()} className='col-md-8'>{ticket.hasOwnProperty('priceRanges') &&  <p>Rango de precios standar: {ticket.priceRanges[0].min}-{ticket.priceRanges[0].max}€</p>}
                <a target="_blank" rel="noopener noreferrer" href={ticket.url}>Compra tus entradas aqui!</a></MDBCol>
                  <MDBCol key={ubication.name.toString() + '_' + ticket.images[0].url.toString()} className='ms-auto col-example' center><img src={ticket.images[0].url} width="200px"/></MDBCol>
                </MDBRow>
                
                
              </MDBModalBody>
              
      <hr />
    </>
  });

  const listCU = response.Currents.map((current) => {
    return <>
                <h6 className="text-center">"{current.title}"</h6>
              <MDBModalBody key={ubication.name.toString() + '_' + current.title.toString()} >                
              <MDBRow key={ubication.name.toString() + '_' + current.title.toString() + '_rowKey'}>
                <MDBCol key={ubication.name.toString() + '_' + current.title.toString() + '_' + current.description.toString()} className='col-md-12'>{current.description}</MDBCol>
              </MDBRow>
              <MDBCol key={ubication.name.toString() + '_' + current.title.toString() + '_colKey'} className='mt-2'>
                <MDBCol key={ubication.name.toString() + '_' + current.title.toString() + '_' + current.author.toString()} className='col-md-6' style={{paddingTop: '1rem'}}><figcaption class="blockquote-footer">{"Autor: " + current.author}</figcaption></MDBCol>
                <MDBCol key={ubication.name.toString() + '_' + current.title.toString() + '_' + current.published.toString()} className='ms-auto col-example'><figcaption class="blockquote-footer">{"Fecha: " + current.published.split("+")[0]}</figcaption></MDBCol></MDBCol>
                <MDBCol key={ubication.name.toString() + '_' + current.title.toString() + '_' + current.url.toString()} className='col-md-6'><figcaption class="blockquote-footer"><a target="_blank" rel="noopener noreferrer" href={current.url}>Link a la noticia</a></figcaption></MDBCol>
              </MDBModalBody>
      <hr />
    </>
  });

  const TicketHead = ticket.length !== 0 ? <MDBModalHeader key={ubication.name.toString() + '_modalTicketHeaderKey'} className='mb-4' >
  <MDBModalTitle key={ubication.name.toString() + '_proximosEventosTitleKey'} >Próximos eventos</MDBModalTitle></MDBModalHeader> : "";
  const CurrentHead = response.Currents.length !== 0 ? <MDBModalHeader key={ubication.name.toString() + '_modalNewsHeaderKey'} className='mb-4' >
  <MDBModalTitle key={ubication.name.toString() + '_ultimasNoticiasTitleKey'}>Últimas noticias</MDBModalTitle></MDBModalHeader> : "";


  


return (

    <>
    <MDBBtn style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} onClick={toggleShow}>Mas informacion</MDBBtn>
      <MDBModal key={ubication.name.toString() + '_modalKey'} show={basicModal} setShow={setBasicModal} tabIndex='-1' >
        <MDBModalDialog key={ubication.name.toString() + '_modalDialogKey'} size="lg" centered>
          <MDBModalContent key={ubication.name.toString() + '_modalContentKey'}>
          <MDBModalHeader key={ubication.name.toString() + '_modalHeaderKey'}>
                <MDBModalTitle key={ubication.name.toString() + '_modalTitleKey'}>Más información sobre {ubication.name}</MDBModalTitle>
                <MDBBtn key={ubication.name.toString() + '_modalBtnKey'} className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody key={ubication.name.toString() + '_modalBody'}>
              
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