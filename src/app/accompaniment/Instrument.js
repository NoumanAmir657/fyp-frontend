import styles from "./page.module.css"
import "../globals.css";

import { useEffect, useRef, useState } from "react";

const Instrument = ({name, instruments, setInstruments}) => {
    const [clicked, setClicked] = useState(false)

    const handleClicked = () => {
        const n = name.replace(/\n/g, "-")
        if (!instruments.includes(n)) {
            if ((n == 'drums' || n == 'double-time' || n == 'half-time') && (instruments.includes('drums') || instruments.includes('double-time') || instruments.includes('half-time'))) {
                return
            }
        }

        if (clicked) {
            setInstruments(instruments.filter(instrument => instrument != n))
        }
        else {
            setInstruments([...instruments, n])
        }
        setClicked(!clicked)
    }

    return (
        <div onClick={handleClicked} className="ml-10 mr-10 rounded-lg p-2" style={{backgroundColor: clicked ? 'pink' : '#FFF2F9'}}>
            <img src={`/icons/` + name.replace(/\n/g, "-") + `.svg`} height='80px' width='90px' className={styles.pulse}/>
            <p style={{fontFamily: 'Poppins'}} className="text-center text-2xl whitespace-pre-line">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
    )
}

export default Instrument