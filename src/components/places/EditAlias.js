import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function EditAlias({ubication, response}) {

  const navigate = useNavigate();
  const [basicModal, setBasicModal] = useState(false);
  const [currentAlias, setCurrentAlias] = useState(ubication.alias);
  
  const data = JSON.parse(window.localStorage.getItem('ubications'));

  const handleCurrentAlias = (alias) => {
    setCurrentAlias(alias);
  }

  const handleUpdatePlaceAlias = (e) => {
    e.preventDefault();

    //Creamos el nuevo LocalStorage que incluira el alias de la ubicacion
    let newLocalData = [];

    for(let i = 0; i < data.length; i++){
      if(data[i][0].name === ubication.name && JSON.stringify(data[i][1]) === JSON.stringify(response)){
        let auxDataNewAlias = JSON.parse(JSON.stringify(data[i][0]));
        auxDataNewAlias.alias = currentAlias;
        newLocalData.push([auxDataNewAlias, data[i][1]]);
      }
      else{
        newLocalData.push([data[i][0], data[i][1]]);
      }
    }

    //Iniciamos el fetch con los datos que necesita backend en el objeto entries
    let entries = {
      userUID: window.localStorage.getItem('uid'),
      coordinates: [parseFloat(ubication.lon).toFixed(2), parseFloat(ubication.lat).toFixed(2)],
      alias: currentAlias
    }

    fetch("/place/alias", {
      method: 'POST',
      body: JSON.stringify(entries),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.log('Error:',error))
    .then(response =>{
      if(response.mssg === 'Success'){
        console.log("Updated place alias");
        window.localStorage.setItem('ubications', JSON.stringify(newLocalData));
        //Cerramos el modal
        toggleEditAliasShow();
        navigate('/');
      }else{
        console.log(response.mssg)
      }
    });
  }

  const toggleEditAliasShow = () => setBasicModal(!basicModal);


  return (
    <>
      <MDBBtn title='Editar alias' tag='a' floating color='secondary' rounded size='sm' onClick={toggleEditAliasShow} style={{marginLeft: '0.5rem', marginTop: '-0.25rem'}}>
        <MDBIcon fas icon="pen" />
      </MDBBtn>

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1' >
        <MDBModalDialog centered>
          <MDBModalContent>

            <MDBModalHeader >
              <MDBModalTitle >Editar alias de ubicación</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleEditAliasShow}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBInput wrapperClass='mb-4 w-100' label='Alias de ubicación' id='aliasEditField' type='text' name='aliasEditField' value={currentAlias} size="lg" onChange={(e)=> {handleCurrentAlias(e.target.value);}}/>

              <MDBBtn id='aliasEditFieldBtn' className="mb-2" style={{left: '50%', transform: 'translateX(-50%)', width: '100%'}} onClick={handleUpdatePlaceAlias}>Guardar y cerrar ventana</MDBBtn>
            </MDBModalBody>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}