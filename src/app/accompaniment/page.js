"use client";
import React from "react";
import { useState, useRef } from "react";

import "../globals.css"

import UploadButton from './UploadButton';
import Wave from "./Wave";
import Instrument from "./Instrument";
import GenerateAccompanimentButton from "./GenerateAccompanimentButton";

const AccompanimentPage = () => {
    const [inputFile, setInputFile] = useState(null);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null)
    const waveformRef_melody = useRef(null);
    const waveformRef_accompaniment = useRef(null);
    const [instruments, setInstruments] = useState([])
    const [accompaintment, setAccompaintment] = useState(null)
    const [clicked, setClicked] = useState([false, false, false, false, false])

    return (
        <>
        <div className="ml-28 mr-28">
            <p className="text-5xl text-center" style={{fontFamily: 'YourFontName'}}>Accompaniment Generation</p>
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
                    <Wave waveformRef={waveformRef_melody} waveFile={inputFile} singleButton={false}/>
                </div>

                <div className="text-center text-3xl mb-1" style={{fontFamily: 'YourFontName  '}}>
                    Choose Instruments
                </div>
        
                <div className="w-full flex justify-center">
                    <Instrument name={"drums"} instruments={instruments} setInstruments={setInstruments} clicked={clicked} setClicked={setClicked} index={0}/>
                    <Instrument name={"piano"} instruments={instruments} setInstruments={setInstruments} clicked={clicked} setClicked={setClicked} index={1}/>
                    <Instrument name={"guitar"} instruments={instruments} setInstruments={setInstruments} clicked={clicked} setClicked={setClicked} index={2}/>
                    <Instrument name={"double\ntime"} instruments={instruments} setInstruments={setInstruments} clicked={clicked} setClicked={setClicked} index={3}/>
                    <Instrument name={"half\ntime"} instruments={instruments} setInstruments={setInstruments} clicked={clicked} setClicked={setClicked} index={4}/>
                </div>

                <div className="w-full flex justify-normal">
                    <GenerateAccompanimentButton setAccompaintment={setAccompaintment} instruments={instruments} inputFile={inputFile}/>
                </div>

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
        </>
    );
};

export default AccompanimentPage;