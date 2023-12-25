import styles from "./page.module.css"
import "../globals.css";

const GenerateSourceButton = ({inputFile, setInstrumental, setVocals, setDrums, setBass}) => {
    const handleSend = async () => {
        const formData = new FormData();
        formData.append('audioFile', inputFile);

        try {
            // Dynamic import of jszip
            const JSZip = (await import('jszip')).default;
            const response = await fetch('http://127.0.0.1:8000/api/sourceSeparate/', {
                method: 'POST',
                body: formData,
            });
            console.log("Hello SS")
        
            if (response.ok) {
                const blob = await response.blob();
        
                // Use jszip to extract files from the ZIP archive
                const zip = new JSZip();
                const zipFiles = await zip.loadAsync(blob);

                const vocalsFile = zipFiles.file('vocals.mp3')
                const vocalsBlob = await vocalsFile.async('blob');
                const vocals = new File([vocalsBlob], 'vocals.mp3', { type: 'audio/mp3' });

                const insFile = zipFiles.file('others.mp3')
                const insBlob = await insFile.async('blob');
                const ins = new File([insBlob], 'others.mp3', { type: 'audio/mp3' });

                const drumsFile = zipFiles.file('drums.mp3')
                const drumsBlob = await drumsFile.async('blob');
                const drums = new File([drumsBlob], 'drums.mp3', { type: 'audio/mp3' });

                const bassFile = zipFiles.file('bass.mp3')
                const bassBlob = await bassFile.async('blob');
                const bass = new File([bassBlob], 'bass.mp3', { type: 'audio/mp3' });

                setInstrumental(ins)
                setVocals(vocals)
                setDrums(drums)
                setBass(bass)
                
            } else {
                console.error('Error processing audio:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading audio:', error);
        }
    };

    return (
        <div className="w-full flex justify-center mt-6 font-bold">
            <button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} role="button" onClick={handleSend}>Generate Sources</button>
        </div>
    )
}

export default GenerateSourceButton