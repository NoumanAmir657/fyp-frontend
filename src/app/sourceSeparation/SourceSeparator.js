import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef, useState } from "react";

import WaveSurfer from 'wavesurfer.js';

const SourceSeparator = ({waveformRefVocals, waveformRefIns, waveFileVocals, waveFileIns}) => {
    const wavesurferRefVocals = useRef(null)
    const wavesurferRefIns = useRef(null)
    const [vocalsVol, setVocalsVol] = useState(0.5)
    const [insVol, setInsVol] = useState(0.5)
    
    useEffect(() => {
        if (waveFileVocals) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRefVocals.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 5,
            barRadius: 10,
            barGap: 2,
          });
    
          wavesurfer.load(URL.createObjectURL(waveFileVocals));
          wavesurfer.setVolume(vocalsVol)

          wavesurferRefVocals.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [waveFileVocals]);

    useEffect(() => {
        if (waveFileIns) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRefIns.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 5,
            barRadius: 10,
            barGap: 2,
          });
    
          wavesurfer.load(URL.createObjectURL(waveFileIns));
          wavesurfer.setVolume(insVol)

          wavesurferRefIns.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [waveFileIns]);

    const handleWaveformClick = () => {
        if (wavesurferRefVocals.current && waveformRefIns.current) {
          wavesurferRefVocals.current.playPause();
          wavesurferRefIns.current.playPause();
        }
    };

    const handleRestart = () => {
        if (wavesurferRefVocals.current && waveformRefIns.current) {
          wavesurferRefVocals.current.seekTo(0)
          wavesurferRefIns.current.seekTo(0)
        }
    };

    const handleVocalsVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVocalsVol(newVolume);
        wavesurferRefVocals.current.setVolume(newVolume);
    };

    const handleInsVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setInsVol(newVolume);
        wavesurferRefIns.current.setVolume(newVolume);
    };

    return (
        <>
        <div className="w-full flex justify-center mr-7 mt-5">
            <div className="w-full ml-10">
                <div ref={waveformRefVocals} onClick={handleWaveformClick} className="w-full mx-auto mt-2 pr-10"/>
            </div>

            <input
                    id='slider'
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={vocalsVol}
                    className={styles.slider}
                    onChange={handleVocalsVol}
            />

            <div className="w-full">
                <div ref={waveformRefIns} onClick={handleWaveformClick} className="w-full mx-auto mt-2 pr-10"/>
            </div>

            <input
                    id='slider'
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={insVol}
                    className={styles.slider}
                    onChange={handleInsVol}
            />
        </div>

        <div className="w-full flex justify-center mt-10">
            <div className="mr-28">
                <button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} role="button" onClick={handleWaveformClick}>Play/Pause</button>
            </div>
            <div className="ml-28">
                <button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} role="button" onClick={handleRestart}>Restart</button>
            </div>
        </div>

        </>
    )
}

export default SourceSeparator;