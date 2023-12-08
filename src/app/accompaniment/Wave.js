import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef } from "react";

import WaveSurfer from 'wavesurfer.js';

const Wave = ({waveformRef, waveFile}) => {
    const wavesurferRef = useRef(null);

    useEffect(() => {
        if (waveFile) {
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
          wavesurfer.load(URL.createObjectURL(waveFile));

          wavesurferRef.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [waveFile]);

    const handleWaveformClick = () => {
        if (wavesurferRef.current) {
          wavesurferRef.current.playPause();
        }
    };

    return (
        <>
            <div ref={waveformRef} onClick={handleWaveformClick} className="w-11/12 mx-auto mt-7"/>
            <div className="w-full flex justify-center mt-2">
                <button className={styles.uploadButton} style={{fontFamily: 'YourFontName'}} role="button" onClick={handleWaveformClick}>Play/Pause</button>
            </div>
        </>
    )
}

export default Wave;