import React, {useEffect, useState} from 'react'
import axios from 'axios'
export default function Address({
    addressLine1Props,
    addressLine2Props,
    zipCodeProps,
    phoneNumberProps,  
    landmarkProps,
    isUpdateProps,
    btnText,
    handleCancelEvent,
    handleUpdateDetails
}) {
    const [isAddress,setIsAddress] = useState(false)
    const [isUpdateAddress,setIsUpdateAddress] = useState(isUpdateProps)
    const [address,setAddress] = useState([])
    const [addressLine1,setAddressLine1] = useState('-')
    const [addressLine2,setAddressLine2] = useState('-')
    const [country,setCountry] = useState('India')
    const [state,setState] = useState('Gujarat')
    const [zipCode,setZipCode] = useState('-')
    const [phoneNumber,setPhoneNumber] = useState('-')
    const [landmark ,setLandmark ] = useState('-')
    const [city ,setCity ] = useState('-')
    const [arrayOfPostOffice,setArrayOfPostOffice] = useState([])
    const [landmarkOptions,setLandmarkOptions] = useState([])
    useEffect(()=>{
        if(zipCodeProps){
            axios(`https://api.postalpincode.in/pincode/${zipCodeProps}`).then((result)=>{  
                if(result.data[0].Status === "Success"){
                  setArrayOfPostOffice(result.data[0].PostOffice)
                }
            })
        }
        setAddressLine1(addressLine1Props)
        setAddressLine2(addressLine2Props)
        setPhoneNumber(phoneNumberProps)
        setZipCode(zipCodeProps)
        setLandmark(landmarkProps)
    },[])
    useEffect(()=>{
        let temp = []
        if(arrayOfPostOffice.length && arrayOfPostOffice[0].State === 'Gujarat'){
          setCity(arrayOfPostOffice[0].Block)
          arrayOfPostOffice.map(val=>{
            if(val.BranchType === 'Sub Post Office'){
              temp.push(val.Name)
            }
          })
          setLandmarkOptions(temp)
        }
      },[arrayOfPostOffice])
  
      useEffect(()=>{
        if(!zipCode){
          setCity('')
          setLandmarkOptions([])
        }
      },[zipCode])
    return (
        <div >
        {/* <h4 className="mb-3">Shipping Address</h4> */}
        <div className="mb-3">
            <label for="address">Address</label>
            <input type="text" value={addressLine1!=='-'?addressLine1:''} onChange={(e)=>setAddressLine1(e.target.value)} className="form-control" id="address" placeholder="1234 Main St" required="" />
            {!addressLine1 ?  <div className="text-danger"> Please enter your shipping address. </div>: null }
          </div>
          <div className="mb-3">
              <label for="address2">Address 2</label>
              <input type="text" value={addressLine2!=='-'?addressLine2:''} onChange={(e)=>setAddressLine2(e.target.value)} className="form-control" id="address2" placeholder="Apartment or suite" />
              {!addressLine2 ?  <div className="text-danger"> Please enter your shipping address. </div>: null }
          </div>
          <div className="row">
              <div className="col-md-5 mb-3">
                  <label for="phoneNumber">Phone No.</label>
                  <input type="number" value={phoneNumber!=='-'?phoneNumber:''} className="form-control" id="zip" onChange={(e)=>setPhoneNumber(e.target.value)} placeholder="" required="" />
                  {!phoneNumber ? 
                  <div className="text-danger"> Phone Number required. </div>
                  : null }
              </div>
              <div className="col-md-3 mb-3">
                  <label for="zip">Zip</label>
                  <input type="text" value={zipCode!=='-'?zipCode:''} className="form-control" id="zip" 
                  onChange={(e)=>{
                    setZipCode(e.target.value)
                    axios(`https://api.postalpincode.in/pincode/${e.target.value}`).then((result)=>{  
                      if(result.data[0].Status === "Success"){
                        setArrayOfPostOffice(result.data[0].PostOffice)
                      }
                    })
                  }} placeholder="" required="" />
                  {!zipCode ? 
                  <div className="text-danger"> Zip code required. </div>
                  : null }
              </div> 
              <div className="col-md-4 mb-3">
                  <label for="zip">Landmark</label>
                  {console.log('LOL======>',landmark)}
                  <select className="custom-select d-block w-100"  defaultValue={landmark!=='-'?landmark:''} onChange={(e)=>setLandmark(e.target.value)} id="country" required="">
                      {/* <option value="">Choose...</option> */}
                      {landmarkOptions.length ? 
                        landmarkOptions.map((val)=>(
                          <option value={val} key={val}>{val}</option>
                        ))
                      : null }
                  </select>
                  {/* <input type="text" value={district!=='-'?district:''} className="form-control" id="zip" onChange={(e)=>setZipCode(e.target.value)} placeholder="" required="" /> */}
                  {!landmark ? 
                  <div className="text-danger"> Distric required. </div>
                  : null }
              </div> 
          </div>
          <div className="row">
              <div className="col-md-4 mb-3">
                  <label for="address2">City</label>
                  <input type="text" value={city!=='-'?city:''} disabled={true} onChange={(e)=>setCity(e.target.value)} className="form-control" id="city" placeholder="City Name" />
                  {/* {!city ?  <div className="text-danger"> City required. </div>: null } */}
              </div>
              <div className="col-md-4 mb-3">
                  <label for="state">State</label>
                  <select className="custom-select d-block w-100" disabled={true} defaultValue={state!=='-'?state:'Gujarat'} onChange={(e)=>setState(e.target.value)} id="state" required="">
                      <option value="">Choose...</option>
                      <option value="Gujarat">Gujarat</option>
                  </select>
                  {!state ? 
                  <div className="text-danger"> Please provide a valid state. </div>
                  : null }
              </div>
              <div className="col-md-4 mb-3">
                  <label for="country">Country</label>
                  <select className="custom-select d-block w-100" disabled={true} defaultValue={country!=='-'?country:'India'} onChange={(e)=>setCountry(e.target.value)} id="country" required="">
                      <option value="">Choose...</option>
                      <option value="India">India</option>
                  </select>
                  {!country ? 
                  <div className="text-danger"> Please select a valid country. </div>
                  : null }
              </div>
          </div>
        {isUpdateAddress ? 
        <div className='d-flex justify-content-around mt-5'>
        <button className="btn btn-warning col-5" 
        onClick={()=>handleUpdateDetails({
            addressLine1,
            addressLine2,
            zipCode,
            phoneNumber,
            landmark,
            city,
            state,
            country,
        })} 
        >Update {btnText}</button>
        <button className="btn btn-secondary col-5" onClick={handleCancelEvent} >Cancel</button>
        </div>
        :
        <button class="btn btn-primary btn-lg btn-block" 
        // onClick={handleAddressEvent}
        >Add {btnText}</button> 
        }
        </div>
    )
}
