import React from 'react';
import  './Form.css';
import {setDataState} from '../../reducer/reducer';
import Header from '../../Components/Header/header';


class Form extends React.Component{

    constructor(){
        super();
        this.state = {
            first_name:'',
            last_name:'',
            email:'',
            phone_numer:'',
            gender:'',
        }
    }

    firstNameChangeEvent = (event) => {
        this.setState({first_name:event.target.value});
    }
    lastNameChangeEvent = (event) => {
        this.setState({last_name:event.target.value});
    }
    emailChangeEvent = (event) => {
        this.setState({email:event.target.value});
    }
    phoneNumberChangeEvent = (event) => {
        this.setState({phone_numer:event.target.value});
    }
    submitData = () => {
        if(this.state.first_name === '' |
            this.state.last_name === '' |
            this.state.email === '' |
            this.state.phone_numer === '' |
            this.state.gender === '' ){
                alert('Enter All detils');
        }else{
            setDataState(this.state);
            alert('Successfully Data Submited...');
            this.setState({
                first_name:'',
                last_name:'',
                email:'',
                phone_numer:'',
                gender:''
            })
        }
    }

    render(){
        return(
            <div style={{width:"100%"}}>
                <Header text='Registration Form' />
                <form>
                <table className="formTag">
                    <tbody>
                    <tr >
                        <td><label>First Name:</label></td>
                        <td><input type="text" onChange={this.firstNameChangeEvent} value={this.state.first_name} /><br/></td>
                    </tr>
                    <tr>
                        <td><label>Last Name:</label></td>
                        <td><input type="text"  onChange={this.lastNameChangeEvent} value={this.state.last_name}/><br/></td>
                    </tr>
                    <tr>
                        <td><label>Email :</label></td>
                        <td><input type="email" onChange={this.emailChangeEvent} value={this.state.email}/><br/></td>
                    </tr>
                    <tr>
                        <td><label>Phone Number:</label></td>
                        <td><input type="number"  onChange={this.phoneNumberChangeEvent} pattern="[1-9]{1}[0-9]{9}"  value={this.state.phone_numer}/><br/></td>
                    </tr>   
                    <tr>
                        <td><label>Gender</label></td>
                        <td>
                            <input type="radio"  checked={ this.state.gender === 'Male' } onChange={() => this.setState({gender:'Male'})} /> 
                            <label className="gendelLabel">Male</label> 
                            <input type="radio" checked={ this.state.gender === 'Female' } onChange={() => this.setState({gender:'Female'})}/>
                            <label className="gendelLabel">Female</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'><input type="button" onClick={this.submitData} value="Submit"/></td>
                    </tr>    
                    </tbody>                                      
                </table>
                </form>
            </div>
        );
    }
}


export default Form;