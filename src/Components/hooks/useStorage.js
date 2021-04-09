import { useEffect , useState } from 'react';
import { storage , timetamp } from '../firebase';

const useStorage = (file) => {
    const [progress , setProgress] = useState(0);
    const [error , setError] = useState(null);
    const [url , setUrl] = useState(null);

    useEffect(() => {
        // references
        const storageRef = storage.ref(file.name);

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        },(error) => {
            setError(error);
        }, async () => {
             const url = await storageRef.getDownloadURL();
             setUrl(url);
        })

    },[file]);

    return { progress , error , url }
}

export default useStorage;