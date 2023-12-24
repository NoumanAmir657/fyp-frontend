import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef, useState } from "react";

import WaveSurfer from 'wavesurfer.js';

const Wave = ({waveformRef, waveFile}) => {
    const wavesurferRef = useRef(null);
    const [volume, setVolume] = useState(0.5)
    
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
          wavesurfer.setVolume(volume)
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

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        wavesurferRef.current.setVolume(newVolume);
    };

    return (
        <>
            <div className="mt-8 mr-5 ml-10">
                <button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} role="button" onClick={handleWaveformClick}>Play/Pause</button>
            </div>

            <div className="w-full">
                <div ref={waveformRef} onClick={handleWaveformClick} className="w-full mx-auto mt-2 pr-10"/>
            </div>

            <input
                    id='slider'
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    className={styles.slider}
                    onChange={handleVolumeChange}
            />
        </>
    )
}

export default Wave;