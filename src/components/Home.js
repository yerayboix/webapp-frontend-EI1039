import React from 'react';
import {
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';
import Card from './places/Card';

export default function Home() {
const data = null;
const listItems = data.map(card =>
    <MDBCol sm='3'>
        <Card ubication={card[0]} response={card[1]} />
    </MDBCol>
  );
  return (
    <MDBRow>
        {listItems}
    </MDBRow>
  );
}