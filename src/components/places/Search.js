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
    MDBCardBody
} from 'mdb-react-ui-kit';
 
const Search = () => {

    console.log(window.localStorage);

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    //The search type can be P for Places or C for coordinates
    const [searchType, setSearchType] = useState('P');
    const [searchResults, setSearchResults] = useState([]);
    

    const handleSearch = async (e) => {
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
            if(response.mssg === 'Success'){
                console.log(response.values);
                setSearchResults(response.values);
            }else{
                setErrorMessage(response.mssg);
                setSearchResults([]);
            }
        });
        
    }

    
    return(
        <div className="Search vh-100 pt-4" style={{backgroundColor: '#9A616D'}}>
           <MDBContainer fluid>
            
                <MDBCard className='bg-white mx-auto ' style={{borderRadius: '1rem'}}>
                    <MDBCardBody className='p-5  d-flex flex-column'>
            
                        <MDBRow className='searchBar d-flex justify-content-center align-items-center h-100'>
                            <MDBCol>
                                <MDBInput wrapperClass='mb-4 w-100' label='Search place...' id='searchBar' type='text'name='searchBar' size="lg" onChange={(e)=>setSearchTerm(e.target.value)}/>
                            </MDBCol>
                            <MDBCol>
                                <select  className='mb-4 w-100' value={searchType} onChange={(e)=>setSearchType(e.target.value)}>
                                    <option value="P">Place</option>
                                    <option value="C">Coordinates</option>
                                </select>
                            </MDBCol>
                            <MDBCol>
                                <MDBBtn type='submit' onClick={handleSearch} className="btn btn-dark btn-lg btn-block mb-4" size='lg' >
                                    Enviar
                                </MDBBtn>
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
                                            </tr>
                                        ))}
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                            :
                            <div>
                                <h2>{searchResults[0].formatted}</h2>
                            </div>
                        }
                        </div>
                }
                </div>
            
        </MDBCardBody>
        </MDBCard>
            </MDBContainer>
        </div>
    )
}
 
export default Search;