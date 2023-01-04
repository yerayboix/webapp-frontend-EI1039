import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useState } from "react";
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBSpinner
} from 'mdb-react-ui-kit';
import Header from '../body/Header';
import Footer from '../body/Footer';
 
const Search = () => {

    const [searchIsLoading, setSearchIsLoading] = useState('');
    const [addIsLoading, setAddIsLoading] = useState('');

    const [staticModal, setStaticModal] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    //The search type can be P for Places or C for coordinates
    const [searchType, setSearchType] = useState('P');
    const [searchResults, setSearchResults] = useState([]);
    const [user, setUser] = useState(window.localStorage.getItem('email'));
    const [userUID, setUserUID] = useState(window.localStorage.getItem('uid'));
    const data = JSON.parse(window.localStorage.getItem('ubications'));
    // console.log(data)
    
    const handleSearch = async (e) => {
        setSearchIsLoading(true);
        e.preventDefault();
        const searchObjective = {
            searchTerm,
        };
        let direction;
        if(searchType === 'P'){
            direction = '/search/name';
        }
        else{
            direction = '/search/coordinate';
        }
        fetch(direction,{
            method: 'POST',
            body: JSON.stringify(searchObjective),
            headers:{
                'Content-Type': 'application/json'
                }
        }).then(res=>res.json())
        .catch(error => console.error('Error:', error))
        .then(response =>{
            setSearchIsLoading(false);
            if(response.mssg === 'Success'){
                console.log(response.values);
                setSearchResults(response.values);
            }else{
                setErrorMessage(response.mssg);
                setSearchResults([]);
            }
        });
        
    }

    const handleAdd = async (place) =>{
        setAddIsLoading(true);
        let coordinates = [parseFloat(place.lon).toFixed(2), parseFloat(place.lat).toFixed(2)];
        let name = place.city;
        const entries = {
            userUID,
            coordinates,
            name
        }

        fetch("/place/add", {
            method: 'POST',
            body: JSON.stringify(entries),
            headers:{
                'Content-Type': 'application/json'
                }
        }).then(res => res.json())
        .catch(error => console.log('Error:',error))
        .then(response =>{
            setAddIsLoading(false);
            if(response.mssg === 'Success'){
                setSearchResults([]);
                console.log("Place added");
                let data = JSON.parse(window.localStorage.getItem('ubications'));
                data.push([response.place, response.apiData])
                window.localStorage.setItem('ubications', JSON.stringify(data));
                navigate('/')
                //console.log(JSON.parse(window.localStorage.getItem('ubications')))
                //Hacer algo no se front
            }else{
                setErrorMessage(response.mssg);
            }
        });
        
    }

    
    return(
        <>
        <Header></Header>
        <div className="Search vh-100 pt-4 bg-gradient" style={{backgroundColor: '#9A616D'}}>
           <MDBContainer fluid>
                <MDBCard className='bg-white mx-auto ' style={{borderRadius: '1rem'}}>
                    <MDBCardBody className='p-5  d-flex flex-column'>
            
                        <MDBRow className='searchBar d-flex justify-content-center align-items-center h-100'>
                            <MDBCol>
                                <MDBInput wrapperClass='mb-4 w-100' label='Search place...' id='searchBar' type='text'name='searchBar' size="lg" onChange={(e)=>setSearchTerm(e.target.value)}/>
                            </MDBCol>
                            <MDBCol>
                                <select  className='mb-4 w-100 py-2' value={searchType} onChange={(e)=>{setSearchType(e.target.value); setSearchResults([])}}>
                                    <option value="P">Place</option>
                                    <option value="C">Coordinates</option>
                                </select>
                            </MDBCol>
                            <MDBCol>

                                {!searchIsLoading ? (
                                    <MDBBtn type='submit' onClick={handleSearch} className="btn btn-dark btn-lg btn-block mb-4" size='lg' >
                                        Enviar
                                    </MDBBtn>
                                ) : (
                                    <MDBBtn disabled type='submit' onClick={handleSearch} className="btn btn-dark btn-lg btn-block mb-4" size='lg' >
                                        <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                                        Loading...
                                    </MDBBtn>
                                )}

                            </MDBCol>
                        </MDBRow>
                    <div>   
                    { (!(searchResults instanceof Array)) ||searchResults.length===0
                    ? 
                        <div>
                            <h1>There is no result matching that criteria</h1>
                        </div>
                    :
                        <div>
                        {searchType==='P'
                            ?
                            <div>
                                <MDBTable>
                                    <MDBTableBody>
                                        {searchResults.map((place)=>(
                                            <tr key={place.formatted}>
                                                <td>{place.formatted}</td>
                                                <td>

                                                    {!addIsLoading ? (
                                                        <MDBBtn onClick={() => {handleAdd(place); toggleShow()}}>Add to List</MDBBtn>
                                                    ) : (
                                                        <MDBBtn disabled onClick={() => {handleAdd(place); toggleShow()}}>
                                                            <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                                                            Loading...
                                                        </MDBBtn>
                                                    )}

                                                </td>
                                            </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                            :
                            <div>
                                <MDBTable>
                                    <MDBTableBody>
                                            <tr>
                                                <td><h2>{searchResults[0].formatted}</h2></td>
                                                <td>

                                                    {!addIsLoading ? (
                                                        <MDBBtn onClick={() => {handleAdd(searchResults[0]); toggleShow()}}>Add to List</MDBBtn>
                                                    ) : (
                                                        <MDBBtn disabled onClick={() => {handleAdd(searchResults[0]); toggleShow()}}>
                                                            <MDBSpinner size='sm' role='status' tag='span' className='me-2' />
                                                            Loading...
                                                        </MDBBtn>
                                                    )}

                                                </td>
                                            </tr>
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        }
                        </div>
                    }
                    </div>
                </MDBCardBody>
                </MDBCard>
                {/* INICIO POPUP DE QUE HAS AÑADIDO LA UBICACION */}
                            <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal}>
                    <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalBody style={{display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <h3>Ubicacion añadida con éxito.</h3>
                        </MDBModalBody>
                        <MDBModalFooter style={{display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                        </MDBModalFooter>
                    </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            {/* FINAL POPUP DE QUE HAS AÑADIDO LA UBICACION */}
            </MDBContainer>
        </div>
        <Footer></Footer>
        </>
    )
}
 
export default Search;