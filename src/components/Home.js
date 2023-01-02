import React from 'react';
import {
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import Card from './places/Card';
import Header from './body/Header';
import Footer from './body/Footer';

export default function Home() {
const data = JSON.parse(window.localStorage.getItem('ubications'));
const listItems = data.map((card) => {
  let aux1 = card[0];
  let aux2 = card[1];
  return <MDBCol sm='3'>
    <Card  ubication={aux1} response={aux2} />
  </MDBCol>
}
  );
  return (
    <>
    <Header/>
    <section style={{backgroundColor: '#9A616D', flex: 1}}>
      <h1 style={{color: 'white', textAlign: 'center'}}>Mis ubicaciones</h1>
      <div style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
        <MDBRow>
            {listItems}
        </MDBRow>
      </div>
    </section>
    <Footer/>
    </>
  );
}