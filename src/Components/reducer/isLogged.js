
let dataState = window.localStorage.getItem('isLoading');
if(dataState != null){    
dataState = dataState === 'false' ? false : true;
}
const isLoaggedReducer = (state = dataState === null ?  false : dataState  , action) =>{
    switch (action.type) {
        case 'SIGN_IN':
            if(!(state)){
                window.localStorage.setItem('isLoading',!state);
                return !state;
            }
            else{
                window.localStorage.setItem('isLoading',state);
                return state; 
            }
        case 'LOGOUT':
            if(state){
                window.localStorage.setItem('isLoading',!state);
                return !state;
            }
            else{ 
                window.localStorage.setItem('isLoading',state);
                return state;
            }
        default:
            return state;
    }
}
export default isLoaggedReducer;
