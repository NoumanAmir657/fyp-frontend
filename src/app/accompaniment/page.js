"use client";
import React from "react";
import { useState, useRef } from "react";

import "../globals.css"

import UploadButton from './UploadButton';
import Wave from "./Wave";
import Instrument from "./Instrument";
import GenerateButton from "./GenerateButton";

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
                
                <div className="text-center text-2xl" style={{fontFamily: 'YourFontName  '}}>
                    Choose Instruments
                </div>
                
                <div className="w-full flex justify-center">
                    <Instrument name={"drums"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"piano"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"guitar"} instruments={instruments} setInstruments={setInstruments}/>
                </div>

                <GenerateButton accompaniment={accompaintment} setAccompaintment={setAccompaintment} instruments={instruments} inputFile={inputFile} setInstrumental={setInstrumental} setVocals={setVocals}/>

                {accompaintment && (
                        <>
                            <div className="w-full flex text-2xl mt-2" style={{fontFamily: 'YourFontName'}}>
                                <div className="w-full text-center">
                                    Vocals
                                </div>
                                <div className="w-full text-center">
                                    Instruments
                                </div>
                            </div>
                            <div className="w-full flex justify-center mr-5">
                                <Wave waveformRef={waveformRef_vocals} waveFile={accompaintment}/>
                                <Wave waveformRef={waveformRef_instruments} waveFile={accompaintment}/>
                            </div>
                            <div className="w-full text-center text-2xl" style={{fontFamily: 'YourFontName'}}>
                                Accompaniment
                            </div>
                            <div className="w-full flex justify-center mr-5 mb-5">
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