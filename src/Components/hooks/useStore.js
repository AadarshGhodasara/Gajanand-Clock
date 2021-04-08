import  { useEffect , useState } from 'react';
import { store } from '../Firebase';

export var isLoading= 1;
const useStore = (collection) => {

    const [docs , setdocs] = useState([]);

    useEffect(() => {
        const unsub = store.collection(collection)
        .orderBy('createAt','desc')
        .onSnapshot((snap) => {
            let document = [];
            snap.forEach(doc => {
                document.push({...doc.data(), id : doc.id})
            });
            setdocs(document); 
        })
        isLoading=null;
        return () =>  unsub();
    },[collection]);

    return {docs};
 
}

export default useStore;