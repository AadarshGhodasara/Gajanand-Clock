// import React , {useState , useEffect} from 'react';
// import './ReactRefDemo.css';
// function Counter(params) {
//     const [count,setCount] = useState(0);


    // ComponentDidMount
    // useEffect(()=>{
    //     console.log('Component Mount');
    // },[]); 

    // componentDidUpdate 
    // useEffect(()=>{
    //     console.log('Component Mount');
    // },[count]);

    // componentWillUnmount
    // useEffect(()=>{
    //     return(()=>{
    //         console.log('Component unmount')
    //     })
    // },[]);

//     return(
//         <div className='cen'>
//             <h3>Current Count : {count} </h3>
//             <input type='button' value='increment the count' onClick={()=>setCount(count+1)}/>
//         </div>
//     )
// }

// export default Counter;



import React, { Component } from 'react'
import withCounter from './withCounter';
class ClickCounter extends Component {
    // constructor(){
    //     super();
    //     this.state ={
    //         count : 0
    //     }
    // }
    // incrementCounter = () => {
    //     this.setState({count:this.state.count+1});
    // }
    
    render() {
        const {count, incrementCounter} = this.props;
        return (
            <div>
                <button onClick={incrementCounter}>
                  {this.props.name}  Increment Counter : {count}
                </button>
            </div>
        )
    }
}

export default withCounter(ClickCounter);
