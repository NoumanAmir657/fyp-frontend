import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef, useState } from "react";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { IconContext } from "react-icons"

import WaveSurfer from 'wavesurfer.js';

const SourceSeparator = ({waveformRefMelody, waveformRefVocals, waveformRefIns, waveformRefDrums, waveformRefBass, waveFileMelody, waveFileVocals, waveFileIns, waveFileDrums, waveFileBass}) => {
    const wavesurferRefVocals = useRef(null)
    const wavesurferRefIns = useRef(null)
    const wavesurferRefMelody = useRef(null)
    const wavesurferRefDrums = useRef(null)
    const wavesurferRefBass = useRef(null)
    const [vocalsVol, setVocalsVol] = useState(0.5)
    const [insVol, setInsVol] = useState(0.5)
    const [drumsVol, setDrumsVol] = useState(0.5)
    const [bassVol, setBassVol] = useState(0.5)
    const [play, setPlay] = useState(false)
    
    useEffect(() => {
        if (waveFileMelody) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRefMelody.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 5,
            barRadius: 10,
            barGap: 2,
            // interact: false,
          });
    
          wavesurfer.load(URL.createObjectURL(waveFileMelody));
          wavesurfer.setVolume(0)
          
          wavesurferRefMelody.current = wavesurfer;

          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [waveFileMelody]);

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

    useEffect(() => {
        if (waveFileDrums) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRefDrums.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 5,
            barRadius: 10,
            barGap: 2,
          });
    
          wavesurfer.load(URL.createObjectURL(waveFileDrums));
          wavesurfer.setVolume(drumsVol)

          wavesurferRefDrums.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [waveFileDrums]);

    useEffect(() => {
        if (waveFileBass) {
          // Initialize WaveSurfer
          const wavesurfer = WaveSurfer.create({
            container: waveformRefBass.current,
            waveColor: '#FE83C6',
            progressColor: '#FA4EAB',
            responsive: true,
            barWidth: 5,
            barRadius: 10,
            barGap: 2,
          });
    
          wavesurfer.load(URL.createObjectURL(waveFileBass));
          wavesurfer.setVolume(bassVol)

          wavesurferRefBass.current = wavesurfer;
    
          // Clean up on component unmount
          return () => wavesurfer.destroy();
        }
    }, [waveFileBass]);


    const handleWaveformClick = (event) => {
        if (wavesurferRefVocals.current && wavesurferRefIns.current && wavesurferRefMelody.current && wavesurferRefDrums.current && wavesurferRefBass.current) {
            setPlay(!play)
            wavesurferRefVocals.current.playPause();
            wavesurferRefIns.current.playPause();
            wavesurferRefDrums.current.playPause();
            wavesurferRefBass.current.playPause();
            wavesurferRefMelody.current.playPause();
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

    const handleDrumsVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setDrumsVol(newVolume);
        wavesurferRefDrums.current.setVolume(newVolume);
    };

    const handleBassVol = (event) => {
        const newVolume = parseFloat(event.target.value);
        setBassVol(newVolume);
        wavesurferRefBass.current.setVolume(newVolume);
    };

    const handleAllClick = (event) => {
        wavesurferRefMelody.current.seekTo(event.nativeEvent.offsetX / waveformRefMelody.current.clientWidth)
        wavesurferRefVocals.current.seekTo(event.nativeEvent.offsetX / waveformRefMelody.current.clientWidth)
        wavesurferRefIns.current.seekTo(event.nativeEvent.offsetX / waveformRefMelody.current.clientWidth)
        wavesurferRefDrums.current.seekTo(event.nativeEvent.offsetX / waveformRefMelody.current.clientWidth)
        wavesurferRefBass.current.seekTo(event.nativeEvent.offsetX / waveformRefMelody.current.clientWidth)
    }

    return (
        <>
        <div className="w-full mr-7 mt-5">
            <div className="w-full flex justify-center ml-5">
                <div className="mr-14 mt-7">
                {!play && (
                    <IconContext.Provider value={{ color: "#FE83C6", className: 'play' }}>
                        <FaPlayCircle size='6em' onClick={handleWaveformClick}/>
                    </IconContext.Provider>
                )}
                {play && (
                    <IconContext.Provider value={{ color: "#FE83C6", className: 'play' }}>
                        <FaPauseCircle size='6em' onClick={handleWaveformClick}/>
                    </IconContext.Provider>
                )}
                </div>
                <div ref={waveformRefMelody} onClick={(event) => handleAllClick(event)} className="w-full mx-auto mt-2 pr-10"/>
            </div>

            <div className="w-full flex justify-center mt-6">
                <div className="w-full mr-4">
                    <p className="text-center text-2xl" style={{fontFamily: 'YourFontName'}}>Vocals</p>
                    <input
                            id='slider'
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={vocalsVol}
                            className={styles.slider2}
                            onChange={handleVocalsVol}
                    />
                </div>
                <div className="w-full mr-4">
                    <p className="text-center text-2xl" style={{fontFamily: 'YourFontName'}}>Drums</p>
                    <input
                            id='slider'
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={drumsVol}
                            className={styles.slider2}
                            onChange={handleDrumsVol}
                    />
                </div>
                <div className="w-full mr-4">
                    <p className="text-center text-2xl" style={{fontFamily: 'YourFontName'}}>Bass</p>
                    <input
                            id='slider'
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={bassVol}
                            className={styles.slider2}
                            onChange={handleBassVol}
                    />
                </div>
                <div className="w-full mr-4">
                    <p className="text-center text-2xl" style={{fontFamily: 'YourFontName'}}>Others</p>
                    <input
                            id='slider'
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={insVol}
                            className={styles.slider2}
                            onChange={handleInsVol}
                    />
                </div>
            </div>

            <div className="w-full hidden">
                <div ref={waveformRefVocals} className="w-full mx-auto mt-2 pr-10"/>
            </div>
            <div className="w-full hidden">
                <div ref={waveformRefIns} className="w-full mx-auto mt-2 pr-10"/>
            </div>
            <div className="w-full hidden">
                <div ref={waveformRefDrums} className="w-full mx-auto mt-2 pr-10"/>
            </div>
            <div className="w-full hidden">
                <div ref={waveformRefBass} className="w-full mx-auto mt-2 pr-10"/>
            </div>
        </div>
        </>
    )
}

export default SourceSeparator;