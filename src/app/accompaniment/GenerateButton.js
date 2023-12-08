import styles from "./page.module.css"
import "../globals.css";

import axios from "axios";

const GenerateButton = ({accompaniment, setAccompaintment, instruments, inputFile}) => {
    const handleSend = () => {
        if (instruments.length > 0) {
            const formData = new FormData();
            formData.append('instruments', JSON.stringify(instruments));
            formData.append('audioFile', inputFile);
            
            axios
                .post('http://127.0.0.1:8000/api/melodyGenerate/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
                })
                .then(response => {
                    const audioBlob = new Blob([response.data], { type: 'audio/wav' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    
                    setAccompaintment(audioBlob);

                    console.log('Response from server:', response);
                })
                .catch(error => {
                    console.error('Error receiving audio file:', error);
                });
        }          
    };

    return (
        <div className="w-full flex justify-center mt-6">
            <button className={styles.uploadButton} style={{fontFamily: 'YourFontName'}} role="button" onClick={handleSend}>Generate Accompaniment</button>
        </div>
    )
}

export default GenerateButton