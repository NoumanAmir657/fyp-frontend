import styles from "./page.module.css"
import "../globals.css";

const UploadButton = ({fileInputRef, file, setFile, error, setError}) => {

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        
        if (selectedFile) {
            // Check if the file is an mp3 or wav file
            if (!selectedFile.name.match(/\.(mp3|wav)$/)) {
                setError('Please upload an MP3 or WAV file.');
                setFile(null)
                fileInputRef.current.value = ''
                return;
            }
        
            // Check if the file duration is between 10 to 30 seconds
            const audio = new Audio();
            audio.src = URL.createObjectURL(selectedFile);
        
            audio.addEventListener('loadedmetadata', () => {
                const duration = audio.duration;
                if (duration < 10 || duration > 30) {
                    setError('File duration should be between 10 to 30 seconds.');
                    setFile(null)
                    fileInputRef.current.value = ''
                    return;
                }
        
                // If all conditions are met, set the file
                setFile(selectedFile);
                setError('');
            });
        }
    };

    return(
        <>
            <input id='fileLoader' ref={fileInputRef} type='file' className="hidden" onChange={handleFileChange}/>
            <div className="w-full flex justify-center mt-2 font-bold text-xl"><button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} role="button" onClick={() => document.getElementById('fileLoader').click()}>Upload melody</button></div>
        </>
    )
}

export default UploadButton;