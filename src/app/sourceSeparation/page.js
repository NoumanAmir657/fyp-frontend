"use client";
import React from "react";
import { useState, useRef } from "react";

import "../globals.css"

import UploadButton from './UploadButton';
import GenerateSourceButton from "./GenerateSourceButton";
import SourceSeparator from "./SourceSeparator";
import Wave from "./Wave";

const SourceSeparatorPage = () => {
    const [inputFile, setInputFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null)
    const waveformRef_melody = useRef(null);
    const waveformRef_vocals = useRef(null)
    const waveformRef_instruments = useRef(null)
    const [vocals, setVocals] = useState(null)
    const [instrumental, setInstrumental] = useState(null)

    return (
        <>
        <div className="mr-28 ml-28">
            <p className="text-5xl text-center" style={{fontFamily: 'YourFontName'}}>Source Separation</p>
            <UploadButton fileInputRef={fileInputRef} inputFile={inputFile} setFile={setInputFile} error={error} setError={setError}/>

            {error && (
                <>
                    <div className="text-center mt-2">{error}</div>
                </>
            )}

            {inputFile && (
                <>
                    <div className="text-center mt-2">
                        <p style={{fontFamily: 'Poppins'}}>{inputFile.name}</p>
                    </div>

                    <div className="w-full flex justify-center">
                        <Wave waveformRef={waveformRef_melody} waveFile={inputFile} singleButton={false}/>
                    </div>

                    <div className="w-full flex justify-normal">
                        <GenerateSourceButton inputFile={inputFile} setInstrumental={setInstrumental} setVocals={setVocals}/>
                    </div>
                    
                    {vocals && (
                        <>
                        <div className="w-full text-3xl mt-8 text-center" style={{fontFamily: 'YourFontName'}}>
                                Tracks
                        </div>
                            <SourceSeparator waveformRefMelody={waveformRef_melody} waveformRefVocals={waveformRef_vocals} waveformRefIns={waveformRef_instruments} waveFileMelody={inputFile} waveFileVocals={vocals} waveFileIns={instrumental}/>
                        </>
                    )}

                </>
            )}
        </div>
        </>
    );
};

export default SourceSeparatorPage;