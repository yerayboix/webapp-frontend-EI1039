import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
<<<<<<< Updated upstream
import MoreInfo from './MoreInfo';
import ConfigUbication from './ConfigUbication';

export default function Card({ubication, response}) {


  

  return (
    <MDBCard border='dark' className='m-4'>
      <MDBCardBody>
      <div class="d-flex">
              <h6 class="flex-grow-1">{ubication.alias ? ubication.alias : ubication.name}
              <ConfigUbication ubication={ubication} response={response}/>
              </h6>
            </div>

            <div class="d-flex flex-column text-center mt-3 mb-4">
              <h6 class="display-4 mb-0 font-weight-bold" style={{color: '#1C2331'}}> {response.OpenWeather.main.temp.toFixed(0)}°C </h6>
              <span class="small" style={{color: '#868B94'}}>{response.OpenWeather.weather[0].description}</span>
            </div>

            <div class="d-flex align-items-center">
              <div class="flex-grow-1" style={{fontSize: '1rem'}}>
              <div><i class="fas fa-wind fa-fw" style={{color: '#868B94'}}></i> <span class="ms-1"> {response.OpenWeather.wind.speed.toFixed(1)} m/s
=======

export default function Card({ubication, response}) {

  return (
    <MDBCard>
      <MDBCardBody>
      <div class="d-flex">
              <h6 class="flex-grow-1">{ubication.name}</h6>
              <h6>15:07</h6>
            </div>

            <div class="d-flex flex-column text-center mt-5 mb-4">
              <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> {response.OpenWeather.main.temp}°C </h6>
              <span class="small" style="color: #868B94">{response.OpenWeather.weather[0].description}</span>
            </div>

            <div class="d-flex align-items-center">
              <div class="flex-grow-1" style="font-size: 1rem;">
                <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span class="ms-1"> {response.OpenWeather.wind.speed} m/s
>>>>>>> Stashed changes
                  </span></div>
                <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span class="ms-1"> {response.OpenWeather.main.humidity}% </span>
                </div>
              </div>
              <div style={{boxShadow: 'rgb(154 97 109 / 50%) 0px 1px 7px 5px', borderRadius: '99999px', backgroundColor: 'rgb(154 97 109 / 90%)'}}>
                <img src={"http://openweathermap.org/img/wn/" + response.OpenWeather.weather[0].icon + "@2x.png"} width="100px"/>
              </div>
            </div>
<<<<<<< Updated upstream
            <div className='justify-content-center align-items-center' style={{marginTop: '1.5em'}}>
              <MoreInfo ubication={ubication} response={response}></MoreInfo>
            </div>
=======
        <MDBBtn>Button</MDBBtn>
>>>>>>> Stashed changes
      </MDBCardBody>
    </MDBCard>
  );
}