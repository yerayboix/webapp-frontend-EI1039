import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Card({ubication, response}) {

  

  return (
    <MDBCard className='m-4'>
      <MDBCardBody>
      <div class="d-flex">
              <h6 class="flex-grow-1">{ubication.name}</h6>
            </div>

            <div class="d-flex flex-column text-center mt-5 mb-4">
              <h6 class="display-4 mb-0 font-weight-bold" style={{color: '#1C2331'}}> {response.OpenWeather.main.temp}°C </h6>
              <span class="small" style={{color: '#868B94'}}>{response.OpenWeather.weather[0].description}</span>
            </div>

            <div class="d-flex align-items-center">
              <div class="flex-grow-1" style={{fontSize: '1rem'}}>
                <div><i class="fas fa-wind fa-fw" style={{color: '#868B94'}}></i> <span class="ms-1"> {response.OpenWeather.wind.speed} m/s
                  </span></div>
                <div><i class="fas fa-tint fa-fw" style={{color: '#868B94'}}></i> <span class="ms-1"> {response.OpenWeather.main.humidity}% </span>
                </div>
              </div>
              <div>
                <img src={"http://openweathermap.org/img/wn/" + response.OpenWeather.weather[0].icon + "@2x.png"} width="100px"/>
              </div>
            </div>
        <MDBBtn>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}