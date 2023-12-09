import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef } from "react";

import WaveSurfer from 'wavesurfer.js';

import Instrument from "./Instrument";

const Wave = ({waveformRef, waveFile}) => {
    const wavesurferRef = useRef(null);
    const instruments = null
    const setInstruments = null

    useEffect(() => {
        if (waveFile) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 5,
            barRadius: 10,
            barGap: 2,
          });
    
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
            <div className="mt-8 mr-5 ml-10">
                <button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} role="button" onClick={handleWaveformClick}>Play/Pause</button>
            </div>
            <div className="w-full">
                <div ref={waveformRef} onClick={handleWaveformClick} className="w-full mx-auto mt-2 pr-10"/>
            </div>
        </>
    )
}

export default Wave;