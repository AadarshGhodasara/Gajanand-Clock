import React from 'react';
// import '../Css/Form.css';
import { connect } from 'react-redux';
import './showData.css';
import Header from '../../Components/Header/header';

function Profile(props) {
  return(
    <div>
      <Header text='Profile' />
      {/* <h1>Profile Details</h1> */}
      { (props.data === 0) ? 
      <div className="errorOutterTag">
          <div className="errorTag">
            <label className="errorLabel">Data is Not Enterd In Form...</label>
            <label className="errorLabel">Please Registration the Form...</label>
          </div>
      </div>
        
       :
      //  <h1>My Name is {props.first_name} {props.last_name}</h1>
      <div>
       <div className="outterTabelTag">
                 <table className="tableTag">
                    <tbody>
                    <tr >
                        <td className="td"><label><strong> First Name:</strong></label></td>
                        <td><label>{props.first_name}</label><br/></td>
                    </tr>
                    <tr>
                        <td className="td"><label><strong> Last Name:</strong></label></td>
                        <td><label>{props.last_name}</label><br/></td>
                    </tr>
                    <tr>
                        <td className="td"><label><strong>Email:</strong></label></td>
                        <td><label>{props.email}</label><br/></td>
                    </tr>
                    <tr>
                        <td className="td"><label><strong>Phone Number:</strong></label></td>
                        <td ><label>{props.phone_numer}</label><br/></td>
                    </tr>   
                    <tr>
                        <td className="td"><label><strong>Gender:</strong></label></td>
                        <td ><label>{props.gender}</label></td>
                    </tr> 
                    </tbody>                                      
                </table>
       </div>
       </div>
       }
    </div>
  );
}

const mapStateToProps = (state) => {
  if(state.flag === 0){
    return {
      data:0
    }
  }else{
     return{
      first_name : state.first_name,
      last_name : state.last_name,
      email: state.email,
      phone_numer:state.phone_numer,
      gender:state.gender,
      data:1
    } 
  }
}

export default connect( mapStateToProps )(Profile);

// export default Profile