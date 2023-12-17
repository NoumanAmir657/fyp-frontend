"use client";
import React from "react";
import { useState, useRef } from "react";

import "../globals.css"
import styles from './page.module.css'

import UploadButton from './UploadButton';
import Wave from "./Wave";
import Instrument from "./Instrument";
import GenerateAccompanimentButton from "./GenerateAccompanimentButton";
import GenerateSourceButton from "./GenerateSourceButton";

const AccompanimentPage = () => {
    const [inputFile, setInputFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null)
    const waveformRef_melody = useRef(null);
    const waveformRef_accompaniment = useRef(null);
    const waveformRef_vocals = useRef(null)
    const waveformRef_instruments = useRef(null)
    const [instruments, setInstruments] = useState([])
    const [accompaintment, setAccompaintment] = useState(null)
    const [vocals, setVocals] = useState(null)
    const [instrumental, setInstrumental] = useState(null)

    return (
        <div>
            <div className="text-center">
                <p className="text-4xl font-bold mt-5" style={{fontFamily: 'YourFontName'}}>Accompaniment Generation</p>
            </div>

            <UploadButton fileInputRef={fileInputRef} inputFile={inputFile} setFile={setInputFile} error={error} setError={setError}/>

            {error && (
                <><div className="text-center mt-2">{error}</div></>
            )}

            {inputFile && (
            <>
                <div className="text-center mt-2">
                    <p style={{fontFamily: 'Poppins'}}>{inputFile.name}</p>
                </div>

                <div className="w-full flex justify-center">
                    <Wave waveformRef={waveformRef_melody} waveFile={inputFile}/>
                </div>
                
                <div className="text-center text-3xl mb-1" style={{fontFamily: 'YourFontName  '}}>
                    Choose Instruments
                </div>
                
                <div className="w-full flex justify-center">
                    <Instrument name={"drums"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"piano"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"guitar"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"double\ntime"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"half\ntime"} instruments={instruments} setInstruments={setInstruments}/>
                </div>
                
                <div className="w-full flex justify-normal">
                    <GenerateAccompanimentButton setAccompaintment={setAccompaintment} instruments={instruments} inputFile={inputFile}/>
                    <GenerateSourceButton inputFile={inputFile} setInstrumental={setInstrumental} setVocals={setVocals}/>
                </div>
                
                {vocals && (
                        <>
                            <div className="w-full flex text-3xl mt-2" style={{fontFamily: 'YourFontName'}}>
                                <div className="w-full text-center">
                                    Vocals
                                </div>
                                <div className="w-full text-center">
                                    Instruments
                                </div>
                            </div>
                            <div className="w-full flex justify-center mr-5">
                                <Wave waveformRef={waveformRef_vocals} waveFile={vocals}/>
                                <Wave waveformRef={waveformRef_instruments} waveFile={instrumental}/>
                            </div>
                        </>
                )}

                {accompaintment && (
                    <>
                        <div className="w-full text-center text-3xl mt-5" style={{fontFamily: 'YourFontName'}}>
                            Accompaniment
                        </div>
                        <div className="w-full flex justify-center mr-5 mb-12">
                            <Wave waveformRef={waveformRef_accompaniment} waveFile={accompaintment}/>
                        </div>
                    </>
                )}
            </>
            )}
        </div>
    );
};

export default AccompanimentPage;