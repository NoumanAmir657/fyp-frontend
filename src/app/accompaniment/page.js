"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";

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
    const [instruments, setInstruments] = useState([])
    const [accompaintment, setAccompaintment] = useState(null)

    return (
        <div>
            <div className="text-center">
                <p className="text-4xl font-bold" style={{fontFamily: 'YourFontName'}}>Accompaniment Generation</p>
            </div>

            <UploadButton fileInputRef={fileInputRef} inputFile={inputFile} setFile={setInputFile} error={error} setError={setError}/>

            {error && (
                <><div className="text-center mt-2">{error}</div></>
            )}

            {inputFile && (
            <>
                <div className="text-center mt-2">
                    <p className="text-xl" style={{fontFamily: 'YourFontName'}}>{inputFile.name}</p>
                </div>

                <Wave waveformRef={waveformRef_melody} waveFile={inputFile}/>
            
                <div className="w-full flex justify-center mt-5" style={{fontFamily: 'YourFontName'}}>
                    <Instrument name={"drums"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"piano"} instruments={instruments} setInstruments={setInstruments}/>
                    <Instrument name={"guitar"} instruments={instruments} setInstruments={setInstruments}/>
                </div>

                <GenerateButton accompaniment={accompaintment} setAccompaintment={setAccompaintment} instruments={instruments} inputFile={inputFile}/>

                {accompaintment && (
                        <>
                            <div className="text-center">
                                <p className="text-xl font-bold" style={{fontFamily: 'YourFontName'}}>Generated Accompaniment</p>
                            </div>
                            <Wave waveformRef={waveformRef_accompaniment} waveFile={accompaintment}/>
                        </>
                )}
            </>
            )}
        </div>
    );
};

export default AccompanimentPage;