import {useState, useEffect} from 'react';
import {storage,store, timestamp} from '../../Components/Firebase';

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState();

    useEffect(()=>{

        const storageRef = storage.ref(file.name);
        const collectionRef = store.collection('upload_image');

        storageRef.put(file).on('state_changed',(snap)=>{
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        },(err) => {
            setError(err);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createAt = timestamp();
            collectionRef.add({url,createAt});
            setUrl(url);
        })

    },[file]);

    return { progress, error, url }
}

export default useStorage;