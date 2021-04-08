import React  ,{useState} from 'react';
// import Counter from './ClickCounter';
import './ReactRefDemo.css';
import HookExample from './HookExample';
// import ClickCounter from './ClickCounter';
// import HoverCounter from './hoverCounter';
function ReactRefDemo() {
    const [showlabel,setShowLabel] = useState(false);
    // const [showConter,setShowCounter] = useState(null);
    // let reactRef = useRef();    
    // const submitEvent = () => {
    //     alert(reactRef.current.value);
    // }
    return(
        <div className='cen'>
            {/* <input type='text' ref={reactRef}/> */}
            {/* <button  onClick={submitEvent} >Submit</button> */}
            {/* <h1>Our App</h1>
            <button onClick={()=>setShowCounter(!showConter)} >{showConter ? "Hide Counter" : 'Show Counter'}</button>
            {showConter && <Counter />} */}
            
            {/* <ClickCounter name='Aadarsh' /> */}
            {/* if i pass props in click counter so that directly you can no access in clickcounter
                like in clickCounter i pass name props so in that componanet i can't access through this.props.name
                before access you ho in with counter and add rest parameter in prop then and then you can access this.props.name*/}
            {/* <HoverCounter /> */}
            <button onClick={()=>setShowLabel(!showlabel)}>show label</button>
            {showlabel && <HookExample />}
        </div>
    )
}
export default ReactRefDemo;


// we can used HOC (higher order components) to share Common functionality between react component