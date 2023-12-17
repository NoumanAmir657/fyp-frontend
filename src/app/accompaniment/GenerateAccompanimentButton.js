import styles from "./page.module.css"
import "../globals.css";

const GenerateAccompanimentButton = ({setAccompaintment, instruments, inputFile}) => {
    const handleSend = async () => {
        if (instruments.length > 0) {
            const formData = new FormData();
            formData.append('instruments', JSON.stringify(instruments));
            formData.append('audioFile', inputFile);

            try {
                // Dynamic import of jszip
                const JSZip = (await import('jszip')).default;
                const response = await fetch('http://127.0.0.1:8000/api/accompanimentGenerate/', {
                  method: 'POST',
                  body: formData,
                });
          
                if (response.ok) {
                  const blob = await response.blob();
          
                  // Use jszip to extract files from the ZIP archive
                  const zip = new JSZip();
                  const zipFiles = await zip.loadAsync(blob);

                  // const vocalsFile = zipFiles.file('vocals.wav')
                  // const insFile = zipFiles.file('instruments.wav')
                  const accomFile = zipFiles.file('accompaniment.wav');
                  // const vocalsBlob = await vocalsFile.async('blob');
                  // const vocals = new File([vocalsBlob], 'vocals.wav', { type: 'audio/wav' });
                  // const insBlob = await insFile.async('blob');
                  // const ins = new File([insBlob], 'instruments.wav', { type: 'audio/wav' });
                  const accomBlob = await accomFile.async('blob');
                  const accom = new File([accomBlob], 'accompaniment.wav', { type: 'audio/wav' });

                  setAccompaintment(accom)
                  // setInstrumental(ins)
                  // setVocals(vocals)
                  
                } else {
                  console.error('Error processing audio:', response.statusText);
                }
              } catch (error) {
                console.error('Error uploading audio:', error);
              }
        }          
    };

    return (
        <div className="w-full flex justify-center mt-6 font-bold ml-28">
            <button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} role="button" onClick={handleSend}>Generate Accompaniment</button>
        </div>
    )
}

export default GenerateAccompanimentButton