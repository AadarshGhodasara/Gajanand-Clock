import React , {useContext} from 'react'
// import {NameContext} from './HookExample';
import {CounterContext} from './HookExample';
//

// export default function ComponentC() {
//     const {firstName, lastName} = useContext(NameContext);
//     return (
//         <div>
//             {/* before introduction hoot to use Context, it's so complicated...*/}
//             <NameContext.Consumer>
//                 {
//                     user =>{
//                         const {firstName,lastName} = user;
//                         return(
//                             <div>
//                                 <strong>Normal Context</strong><br/>
//                                 recive value from parent Component using useContext <br />
//                                 First Name : {firstName} <br/> Last Name : {lastName}
//                             </div>
//                         )
//                     }
//                 }
//             </NameContext.Consumer>

//             <br/>    
//             {/* after introduction hook to useContext, it's so easy to acess value */}
//             <div>
//                 <strong>Using Hook Context</strong><br/>
//                 recive value from parent Component using useContext <br />
//                 First Name : {firstName} <br/> Last Name : {lastName}
//             </div>
//         </div>
//     )
// }


// for counter context

export default function ComponentC() {
    const {countState,countDispatch } = useContext(CounterContext);
    return (
            <div>
            <strong> <label>Count Reducer in HookExample.js <br/> HookExample / ComponentA / ComponentB / ComponentC <br/> Access Count Reducer in ComponentC.js file useing useContext. </label></strong> <br/>
            <label>Count  {countState}</label><br />
            <button onClick={()=>countDispatch({type:'increment',value:1})}>Increment</button>
            <button onClick={()=>countDispatch({type:'decrement',value:1})}>Decrement</button>
            <button onClick={()=>countDispatch({type:'reset'})}>Reset</button><br/>
            </div>
        
    )
}