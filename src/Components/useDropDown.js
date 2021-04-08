import React , { useState } from 'react';
import '../Pages/HookExample/HookExample.css';

const UseDropDown = (label, defaultStatus, options) => {
    const[state, setState] = useState(defaultStatus);
    const id =`use-dropdown-${label.replace(" ","").toLowerCase()}`
    const Dropdown = () => (
        <label className="label" htmlFor={id}>
            {label}<br />
            <select
                id={id}
                // className="select"
                value={state}
                onChange={e => setState(e.target.value)}
                onBlur={e => setState(e.target.value)}
                disabled={options.length === 0}
            >
                {/* <option>All</option> */}
                {options.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
        </label>
    );


    
    return [state, Dropdown, setState];
    
}

export default UseDropDown;