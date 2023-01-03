import React, { useEffect, useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBContainer
} from 'mdb-react-ui-kit';
import Card from './places/Card';
import Header from './body/Header';
import Footer from './body/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
const navigate = useNavigate();
const localUser = window.localStorage.getItem('email');
const localUid = window.localStorage.getItem('uid');
const [user, setUser] = useState(localUser);
const [userUID, setUserUID] = useState(localUid);


useEffect(() => {
   //Funcion que comprueba si estamos logeados
   if(localUid == null){
       navigate('/login');
   }
});
const data = JSON.parse(window.localStorage.getItem('ubications')) ? JSON.parse(window.localStorage.getItem('ubications')) : [];

const listItems = data.map((card) => {
  return <MDBCol key={card[0].name.toString()} sm='12' md='6' lg='4'>
    <Card key={card[0].lat.toString() + '_' + card[0].lon.toString()} ubication={card[0]} response={card[1]} />
  </MDBCol>
});

  return (
    <>
    <Header/>
    <section className='bg-gradien' style={{backgroundColor: '#9A616D', flex: 1}}>
      <MDBContainer fluid>
      <h1  style={{color: 'white', textAlign: 'center', paddingTop: '1rem'}}>Mis ubicaciones</h1>
      <div style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
        <MDBRow>
            {listItems}
            <div className='col-sm-3' style={{display: 'flex', justifyContent: 'center', position:'relative', verticalAlign: '50%'}}>
            <MDBBtn style={{position: 'absolute', transform: 'translate(-50%, -50%)',top: '50%', left: '50%', borderColor: 'black', backgroundColor: 'white'}} href='/search' size='lg'  color='dark' floating tag='a'>
            <MDBIcon style={{color: 'black'}} fas icon='plus' />
            </MDBBtn>
            </div>
            
        </MDBRow>
      </div>
      </MDBContainer>
    </section>
    <Footer/>
    </>
  );
}