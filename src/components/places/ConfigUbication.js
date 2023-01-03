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
import { useNavigate } from 'react-router-dom';

export default function ConfigUbication({ubication, response}) {
  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);

  const [currentSwitch, setCurrentSwitch] = useState(ubication.services[1]);
  const [ticketSwitch, setTicketSwitch] = useState(ubication.services[2]);

  const data = JSON.parse(window.localStorage.getItem('ubications'));
  //console.log(data)


  const handleCurrentSwitch = () => {
    setCurrentSwitch(!currentSwitch);
  }

  const handleTicketSwitch = () => {
    setTicketSwitch(!ticketSwitch);
  }

  //Funcion para eliminar una ubicacion
  const handleEliminatePlace = (e) => {
    e.preventDefault();
    //Creamos el nuevo LocalStorage sin la ubicacion que vamos a eliminar
    
    let newLocalData = [];
    for(let i = 0; i < data.length; i++){
      if(data[i][0].name === ubication.name && JSON.stringify(data[i][1]) === JSON.stringify(response)){
      }
      else{
        newLocalData.push([data[i][0], data[i][1]]);
      }
    }
    //Iniciamos el fetch con los datos que necesita backend en el objeto entries
    let entries = {
      userUID: window.localStorage.getItem('uid'),
      coordinates: [parseFloat(ubication.lon).toFixed(2), parseFloat(ubication.lat).toFixed(2)]
  }
    fetch("/place/remove", {
        method: 'POST',
        body: JSON.stringify(entries),
        headers:{
            'Content-Type': 'application/json'
            }
    }).then(res => res.json())
    .catch(error => console.log('Error:',error))
    .then(response =>{
        if(response.mssg === 'Success'){
            console.log("Place removed");
            window.localStorage.setItem('ubications', JSON.stringify(newLocalData));
            //Cerramos el modal y vamos a pagina inicio
            toggleShow();
            navigate('/');
            //Hacer algo no se front
        }else{
          console.log(response.mssg)
        }
    });
  }

  //Funcion para cambiar los servicios activos de una ubicacion
  const handleChangeServices = async (e) => {
    e.preventDefault();
    let entries = {
      userUID: window.localStorage.getItem('uid'),
      coordinates: [parseFloat(ubication.lon).toFixed(2), parseFloat(ubication.lat).toFixed(2)],
      weatherService: true,
      newsService: currentSwitch,
      eventsService: ticketSwitch,
      lat: ubication.lat,
      lon: ubication.lon
  }
  //Fetch para cambiar los servicios de una ubicacion en base de datos
    await fetch("/services/place", {
        method: 'POST',
        body: JSON.stringify(entries),
        headers:{
            'Content-Type': 'application/json'
            }
    }).then(res => res.json())
    .catch(error => console.log('Error:',error))
    .then(response =>{
        if(response.mssg === 'Success'){
            console.log("Changed Services");
        }else{
          console.log(response.mssg)
        }
    });

    let entriesForAPIResponse = {
      name: ubication.name,
      alias: ubication.alias,
      services: [true, currentSwitch, ticketSwitch],
      lat: ubication.lat,
      lon: ubication.lon,

    }
    let ubicationPos = -1;
    for(let i = 0; i < data.length; i++){
      if(data[i][0].name === ubication.name && JSON.stringify(data[i][1]) === JSON.stringify(response)){
        ubicationPos = i;
        break;
      }
    }

    //Fetch para obtener las respuestas API de la ubicacion con los nuevos parametros
    await fetch("/place", {
      method: 'POST',
      body: JSON.stringify(entriesForAPIResponse),
      headers:{
          'Content-Type': 'application/json'
          }
  }).then(res => res.json())
  .catch(error => console.log('Error:',error))
  .then(response =>{
      if(response.mssg === 'Success'){
          console.log('Respuestas API obtenias con exito');
          //AAAAAAAAAAAAAAAAAA
          data[ubicationPos][1] = response.data;
          window.localStorage.setItem('ubications', JSON.stringify(data));
          console.log(JSON.parse(window.localStorage.getItem('ubications')))
          toggleShow();
          navigate('/')
      }else{
        console.log(response.mssg)
      }
  });
  }

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <>
    <MDBIcon className="position-absolute top-0 end-0 m-3" icon='cog' onClick={toggleShow} />
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
        <MDBModalDialog size="md" centered>
          <MDBModalContent>
          <MDBModalHeader >
                <MDBModalTitle >Configuración {ubication.alias ? ubication.alias + ' (' + ubication.name + ')' : ubication.name}</MDBModalTitle>
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
                        <MDBBtn className="mb-2" style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} onClick={handleChangeServices}>Guardar Cambios</MDBBtn>
                    </MDBCol>                    
                    <MDBCol size="6">
                        <MDBBtn style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} color= 'danger' type='submit' onClick={handleEliminatePlace} >Eliminar Ubicacion</MDBBtn>
                    </MDBCol>
                </MDBRow>
                
                
                
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}