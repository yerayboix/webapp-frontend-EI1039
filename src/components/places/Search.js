import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useState } from "react";
 
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
                console.log(searchResults + "despues de setear")
            }else{
                setErrorMessage(response.mssg);
            }
        });
        
    }

    
    return(
        <div className="Search">
            <div className="searchBar">
                <form onSubmit={handleSearch}>
                    <input type='text' name='searchBar' placeholder='Search place...' onChange={(e)=>setSearchTerm(e.target.value)}/>
                    <select value={searchType} onChange={(e)=>setSearchType(e.target.value)}>
                        <option value="P">Place</option>
                        <option value="C">Coordinates</option>
                    </select>
                    <input type="submit"/>
                </form>
            </div>
            <div>
                {console.log(searchResults)}
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
                            <table>
                                <tbody>
                                    {console.log(searchResults)}
                                    {searchResults.map((place)=>(
                                        <tr key={place.formatted}>
                                            <td>{place.formatted}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>

                        </div>
                    }
                    </div>
            }
            </div>
        </div>
    )
}
 
export default Search;