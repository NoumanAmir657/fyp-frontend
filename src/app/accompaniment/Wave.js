import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef, useState } from "react";

import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { IconContext } from "react-icons"

import WaveSurfer from 'wavesurfer.js';

const Wave = ({waveformRef, waveFile}) => {
    const wavesurferRef = useRef(null);
    const [volume, setVolume] = useState(0.5)
    const [play, setPlay] = useState(false)
    
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

    const handleWaveformClick = (event) => {
        wavesurferRef.current.seekTo(event.nativeEvent.offsetX / waveformRef.current.clientWidth)
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        wavesurferRef.current.setVolume(newVolume);
    };

    const handlePlayPause = (event) => {
        setPlay(!play)
        wavesurferRef.current.playPause();
    }

    return (
        <>
            <div className="mt-5 mr-5 ml-5">
                {!play && (
                    <IconContext.Provider value={{ color: "#FE83C6", className: 'play' }}>
                        <FaPlayCircle size='6em' onClick={handlePlayPause}/>
                    </IconContext.Provider>
                )}
                {play && (
                    <IconContext.Provider value={{ color: "#FE83C6", className: 'play' }}>
                        <FaPauseCircle size='6em' onClick={handlePlayPause}/>
                    </IconContext.Provider>
                )}
            </div>

            <div className="w-full ml-7">
                <div ref={waveformRef} onClick={(event) => handleWaveformClick(event)} className="w-full mx-auto mt-2 pr-10"/>
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