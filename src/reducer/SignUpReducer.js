
let iState = {
    Name:'',
    Email:'',
    flag:0,
}

export function getDataState() {
    console.log('Red -> ',iState);
    return iState;
}

export  function setDataState(object){
    console.log('Object recive --> ',object);
    iState.Name = object.Name;
    iState.Email = object.email;
    iState.flag = 1;
    console.log('=> ',iState);
    console.log(getDataState())
};



const SignUpReducer = (state=iState) => {
    // if(state === undefined)
    
}

export default SignUpReducer;