"use client";
import { useState, useRef, useEffect } from "react";

import axios from "axios";
import WaveSurfer from 'wavesurfer.js';

import styles from "./page.module.css"
import "../globals.css"

const AccompanimentPage = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null)
    const waveformRef = useRef(null);
    const waveformRef2 = useRef(null);
    const wavesurferRef = useRef(null);
    const [instruments, setInstruments] = useState([])
    const [dClicked, setDClicked] = useState(false)
    const [pClicked, setPClicked] = useState(false)
    const [gClicked, setGClicked] = useState(false)
    const [accompaintment, setAccompaintment] = useState(null)

    useEffect(() => {
        if (file) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 10,
            barRadius: 10,
            barGap: 2,
          });
    
          // Load the selected audio file
          wavesurfer.load(URL.createObjectURL(file));

          wavesurferRef.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
      }, [file]);

      useEffect(() => {
        if (accompaintment) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRef2.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 10,
            barRadius: 10,
            barGap: 2,
          });
    
          // Load the selected audio file
          wavesurfer.load(URL.createObjectURL(accompaintment));

          wavesurferRef.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
      }, [accompaintment]);
  
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

    const handleWaveformClick = () => {
        // Play or pause the audio when clicking on the waveform
        if (wavesurferRef.current) {
          wavesurferRef.current.playPause();
        }
    };

    useEffect(() => {
        console.log(instruments)
    }, [instruments])

    const handleDClicked = () => {
        if (dClicked) {
            setInstruments(instruments.filter(instrument => instrument != 'drums'))
        }
        else {
            setInstruments([...instruments, 'drums'])
        }
        setDClicked(!dClicked)
    }

    const handleGClicked = () => {
        if (gClicked) {
            setInstruments(instruments.filter(instrument => instrument != 'guitar'))
        }
        else {
            setInstruments([...instruments, 'guitar'])
        }
        setGClicked(!gClicked)
    }

    const handlePClicked = () => {
        if (pClicked) {
            setInstruments(instruments.filter(instrument => instrument != 'piano'))
        }
        else {
            setInstruments([...instruments, 'piano'])
        }
        setPClicked(!pClicked)
    }

    const handleSend = () => {
        if (instruments.length > 0) {
            const formData = new FormData();
            formData.append('instruments', JSON.stringify(instruments));
            formData.append('audioFile', file);
            
            axios
                .post('http://127.0.0.1:8000/api/melodyGenerate/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob', // Set the response type to 'blob' for binary data
                })
                .then(response => {
                    // Handle the response, which is a blob representing the audio file
                    const audioBlob = new Blob([response.data], { type: 'audio/wav' });

                    // Create a temporary URL for the blob
                    const audioUrl = URL.createObjectURL(audioBlob);
                    
                    // Set the generated melody as the current accompaniment
                    setAccompaintment(audioBlob);
                    console.log(audioBlob)
                    
                    // Now you can use audioUrl to play or display the processed audio file

                    console.log('Response from server:', response);
                })
                .catch(error => {
                    console.error('Error receiving audio file:', error);
                });
        }          
    };

    return (
        <div>
            <div className="text-center">
                <p className="text-4xl font-bold" style={{fontFamily: 'YourFontName'}}>Accompaniment Generation</p>
            </div>

            <input id='fileLoader' ref={fileInputRef} type='file' className="hidden" onChange={handleFileChange}/>
            <div className="w-full flex justify-center mt-2"><button className={styles.uploadButton} style={{fontFamily: 'YourFontName'}} role="button" onClick={() => document.getElementById('fileLoader').click()}>Upload melody</button></div>


            {error && (
                <><div className="text-center mt-2">{error}</div></>
            )}

            {file && (
            <>
                <div className="text-center mt-2">
                    <p className="text-xl" style={{fontFamily: 'YourFontName'}}>{file.name}</p>
                </div>
                <div ref={waveformRef} onClick={handleWaveformClick} className="w-11/12 mx-auto mt-7"/>
                <div className="w-full flex justify-center mt-2">
                    <button className={styles.uploadButton} style={{fontFamily: 'YourFontName'}} role="button" onClick={handleWaveformClick}>Play/Pause</button>
                </div>
            
                <div className="w-full flex justify-center mt-5" style={{fontFamily: 'YourFontName'}}>
                    <div onClick={handleDClicked} className="ml-10 mr-10 rounded-lg p-2" style={{backgroundColor: dClicked ? 'pink' : '#FFF2F9'}}>
                        <img src="/icons/drums.svg" height='70px' width='70px' className={styles.pulse}/>
                        <p className="text-center font-medium">Drums</p>
                    </div>
                    <div onClick={handlePClicked} className="ml-10 mr-10 rounded-lg p-2" style={{backgroundColor: pClicked ? 'pink' : '#FFF2F9'}}>
                        <img src="/icons/piano.svg" height='70px' width='70px' className={styles.pulse}/>
                        <p className="text-center font-medium">Piano</p>
                    </div>
                    <div onClick={handleGClicked} className="ml-10 mr-10 rounded-lg p-2" style={{backgroundColor: gClicked ? 'pink' : '#FFF2F9'}}>
                        <img src="/icons/guitar.svg" height='70px' width='70px' className={styles.pulse}/>
                        <p className="text-center font-medium">Guitar</p>
                    </div>
                </div>

                <div className="w-full flex justify-center mt-6">
                    <button className={styles.uploadButton} style={{fontFamily: 'YourFontName'}} role="button" onClick={handleSend}>Generate Accompaniment</button>
                </div>

                {accompaintment && (
                        <>
                            <div className="text-center">
                                <p className="text-xl font-bold" style={{fontFamily: 'YourFontName'}}>Generated Accompaniment</p>
                            </div>
                            <div ref={waveformRef2} onClick={handleWaveformClick} className={styles.waveformContainer} />
                        </>
                )}
            </>
            )}
        </div>
    );
};

export default AccompanimentPage;