
import React  from 'react';

// hook with object

// export default function HookExample() {
//     const [name,setName] = useState({firstName:'',lastName:''}); 
//     return (
//         <div>
//             <input type='text' onChange={(e) => setName({...name,firstName:e.target.value})} />
//             <input type='text' onChange={(e)=>setName({...name,lastName:e.target.value})}/>
//             <h3>First Name is {name.firstName}</h3>
//             <h3>Last Name is {name.lastName}</h3>
//         </div>
//     );
// }

// useEffect

// export default function HookExample() {
//     const [count,setCount] = useState(0);
//     useEffect(()=>{
//         document.title=`clicked ${count} times`;
//     });
//     return (
//         <div>
//             <button onClick={(e)=>setCount(count+1)}>Count : {count}</button>
//         </div>
//     )
// }

// Conditionally run effect


// export default function HookExample() {

//     const [name,setName] = useState('');
//     const [count,setCount] = useState(0);

//     useEffect(()=>{
//         console.log('change the document titel...');
//         document.title = `click ${count} times`
//     },[count]);
//     return (
//         <div>
//             <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />
//             <button onClick={()=>setCount(count+1)}>Count : {count}</button>
//         </div>
//     )
// }

// Run effects only once


// export default function HookExample() {
//     const [x,setX] = useState();
//     const [y,setY] = useState();

//     const setMousePosition = (e) => {
//         setX(e.clientX);
//         setY(e.clientY);
//     }
//     useEffect(()=>{
//         console.log('run useEffect');
//         window.addEventListener('mousemove',setMousePosition);
//     },[]);

//     return (
//         <div>
//             Hook X {x} - {y}
//         </div>
//     )
// }

//  useContext Hook

    
// import ComponentA from './ComponentA';
// export const NameContext = React.createContext();
//  function HookExample() {
//     return (
//         <>
//           <NameContext.Provider  value={{firstName:'Aadarsh',lastName:'Ghodasara'}} >
//               <ComponentA />
//           </NameContext.Provider>  
//         </>
//     )
// }
// export default HookExample;



//  useReducer Hook

// const initialState = 0;
// const reducer = (state,action) => {
//     switch (action) {
//         case 'increment':
//             return state + 1;
//         case 'decrement':
//             return state - 1;
//         case 'reset':
//             return initialState;
//         default:
//             return state;
//     }
// }

// export default function HookExample() {
//     const [count, dispatch] = useReducer(reducer, initialState)
//     return (
//         <div>
//             <label>Count : {count}</label><br/>
//             <button onClick={()=>dispatch('increment')}>Increment</button>
//             <button onClick={()=>dispatch('decrement')}>Decrement</button>
//             <button onClick={()=>dispatch('reset')}>Reset</button>
//         </div>
//     )
// }

// useReducer Hook complex state & action


// const initialState = 0;
// const reducer = (state,action) => {
//     switch (action.type) {
//         case 'increment':
//             return state + action.value;
//         case 'decrement':
//             return state - action.value;
//         case 'reset':
//             return initialState;
//         default:
//             return state;
//     }
// }
// export default function HookExample() {
//     const [count, dispatch] = useReducer(reducer, initialState);
//     return (
//         <div>
//             <label>Count  {count}</label><br />
//             <button onClick={()=>dispatch({type:'increment',value:1})}>Increment</button>
//             <button onClick={()=>dispatch({type:'decrement',value:1})}>Decrement</button><br />
//             <button onClick={()=>dispatch({type:'increment',value:5})}>Increment By 5</button>
//             <button onClick={()=>dispatch({type:'decrement',value:5})}>Decrement By 5</button><br />
//             <button onClick={()=>dispatch({type:'reset'})}>Reset</button>
//         </div>
//     )
// }

// Multiple useReducers

// const initialState = 0;
// const reducer = (state,action) => {
//     switch (action.type) {
//         case 'increment':
//             return state + action.value;
//         case 'decrement':
//             return state - action.value;
//         case 'reset':
//             return initialState;
//         default:
//             return state;
//     }
// }
// export default function HookExample() {
//     const [count, dispatch] = useReducer(reducer, initialState);
//     const [countTwo, dispatchTwo] = useReducer(reducer, initialState);
//     return (
//         <div>
//             <label>Count  {count}</label><br />
//             <button onClick={()=>dispatch({type:'increment',value:1})}>Increment</button>
//             <button onClick={()=>dispatch({type:'decrement',value:1})}>Decrement</button>
//             <button onClick={()=>dispatch({type:'reset'})}>Reset</button><br/>
//             <label>Count Two : {countTwo}</label><br />
//             <button onClick={()=>dispatchTwo({type:'increment',value:1})}>Increment</button>
//             <button onClick={()=>dispatchTwo({type:'decrement',value:1})}>Decrement</button>
//             <button onClick={()=>dispatchTwo({type:'reset'})}>Reset</button>
//         </div>
//     )
// }

// useReducer with useContext

// import ComponentA from './ComponentA';
// export const CounterContext = React.createContext();
// const initialState = 0;
// const reducer = (state,action) => {
//     switch (action.type) {
//         case 'increment':
//             return state + action.value;
//         case 'decrement':
//             return state - action.value;
//         case 'reset':
//             return initialState;
//         default:
//             return state;
//     }
// }
//  function HookExample() {
//     const [count, dispatch] = useReducer(reducer, initialState); 
//     return (
//         <>
//             <CounterContext.Provider  value={{countState:count,countDispatch:dispatch}} 
//             >
//               <ComponentA />
//             </CounterContext.Provider>  
//         </>
//     )
// }
// export default HookExample;

// implement a Modal


// import React, { Component } from 'react'

export default class HookExample extends React.Component {
    constructor(){
        super();
        this.state = {
            count:0
        }
        console.log('Constructor life cycle method...')
    }
    static getDerivedStateFromProps(){
        console.log('getDerivedStateFromProps life cycle method..');
        return null;
    }
    
    componentDidMount(){
        console.log('component mount...');
    }
    componentDidUpdate(){
        console.log('componentDidUpdate...');
    }
    componentWillUnmount(){
        console.log('ComponentWillUnmount...');
    }
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate...');
        return true;
    }
    render() {
        return (
            <div><br/><br/>
                <strong>Count : {this.state.count}</strong><br />
                <button onClick={()=>this.setState({count:this.state.count+1})}>
                    Increment Count
                </button>
            </div>
        )
    }
}
