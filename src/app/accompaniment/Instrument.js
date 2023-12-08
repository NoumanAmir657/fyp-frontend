import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef, useState } from "react";

const Instrument = ({name, instruments, setInstruments}) => {
    const [clicked, setClicked] = useState(false)

    const handleClicked = () => {
        if (clicked) {
            setInstruments(instruments.filter(instrument => instrument != name))
        }
        else {
            setInstruments([...instruments, name])
        }
        setClicked(!clicked)
    }

    return (
        <div onClick={handleClicked} className="ml-10 mr-10 rounded-lg p-2" style={{backgroundColor: clicked ? 'pink' : '#FFF2F9'}}>
            <img src={`/icons/` + name + `.svg`} height='70px' width='70px' className={styles.pulse}/>
            <p className="text-center font-medium">Drums</p>
        </div>
    )
}

export default Instrument