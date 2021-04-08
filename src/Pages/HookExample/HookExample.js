import React, { useState , useEffect }  from 'react';
// import '../Css/Form.css';
import './HookExample.css';
import useDropDown from '../../Components/useDropDown';
import CityName from '../../json/StateAndCity.json';
import StateName from '../../json/State.json';
import pet,{ANIMALS} from '@frontendmasters/pet';
import Header from '../../Components/Header/header';

const HookExample = () => {
    const LOCATION = ['Morbi','Rajkot','Ahmedabad','Vadodara','Surat','Gandhinagar']

    const [breeds,setBreeds] = useState([]);
    const [location,setLocation] = useState('Morbi');

    // State Hook
    const [StateLocation,StateDropDown] = useDropDown("State","Gujarat",StateName);
    
    // City Hook
    const State_Index = CityName.findIndex(std=> std.state === StateLocation);
    const [,CityDropDown] = useDropDown("City","",CityName[State_Index].districts);
    
    // Animal Hook
    const [animal,AnimalDropDown] = useDropDown("Animal","dog",ANIMALS);
    const [,BreedDropDown,setBreed] = useDropDown("Breed","",breeds);


    useEffect(() => {

      setBreeds([]);
      setBreed("");

      pet.breeds(animal).then(({ breeds }) => {
        const breedString = breeds.map(({ name }) => name);
        setBreeds(breedString);
      },console.error);
    },[animal,setBreeds,setBreed,location])


    return (
      <div>
        <Header text='React Hook' />
        <h1>Hook Example</h1>
        <div className="hookInnerBox">
          <div className="hookoutterBox">
            <label htmlFor="location" className='label'>State Location </label><br />
            <select
              id = 'location'
              value={location}
              onChange = {(e) => setLocation(e.target.value)}
              onBlur = {(e) => setLocation(e.target.value)}
            >
                <option>All</option>
                {LOCATION.map(location => 
                    <option key={location} value={location}>{location}</option>
                )}
            </select>
          </div>
        </div>

        <h1>Custome Hook Example</h1>
        <div className="hookInnerBox">
          <div className="hookoutterBox">
            <AnimalDropDown  />
            <BreedDropDown />
          </div>
        </div>
        <h1>Custome Hook on State And City Example</h1>
        <h1> All City And State Tack From Json Data </h1>
        <div className="hookInnerBox">
          <div className="hookoutterBox"> 
            <StateDropDown />
            <CityDropDown />
            </div>
        </div>
        <br/><br/><br/><br/>
      </div>
    );
};


export default HookExample;
