
const iState = {
    first_name:'',
    last_name:'',
    email:'',
    phone_numer:'',
    gender:'',
    flag:0,
}

export function setDataState(object){
    // console.log('Object recive --> ',object);
    iState.first_name = object.first_name;
    iState.last_name = object.last_name;
    iState.email = object.email;
    iState.phone_numer = object.phone_numer;
    iState.gender = object.gender;
    iState.flag = 1;
}

const reducer = (state=iState) => {
    if(state === undefined){
        console.log('NO DATA');
    }else{
        return state;  
    }
    
}

export default reducer;