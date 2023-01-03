import React from 'react';
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

export default function Home() {
const data = JSON.parse(window.localStorage.getItem('ubications'));

const listItems = data.map((card) => {
  return <MDBCol sm='3'>
    <Card  ubication={card[0]} response={card[1]} />
  </MDBCol>
});

  return (
    <>
    <Header/>
    <section style={{backgroundColor: '#9A616D', flex: 1}}>
      <h1  style={{color: 'white', textAlign: 'center', paddingTop: '1rem'}}>Mis ubicaciones</h1>
      <div style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
        <MDBRow>
            {listItems}
            <MDBCol style={{paddingTop: '10rem'}}><MDBBtn border='dark' href='/search' centered style={{width: '5%', height: '25%'}} size='lg'  color='dark' floating tag='a'>
            <MDBIcon style={{paddingTop: '12%'}} centered fas icon='plus' />
            </MDBBtn></MDBCol>
            
        </MDBRow>
      </div>
    </section>
    <Footer/>
    </>
  );
}