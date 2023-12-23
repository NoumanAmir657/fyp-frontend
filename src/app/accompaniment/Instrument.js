import styles from "./page.module.css"
import "../globals.css";

import { useState } from "react";

const Instrument = ({name, instruments, setInstruments, clicked, setClicked, index}) => {
    // const [clicked, setClicked] = useState(false)

    const handleClicked = () => {
        const n = name.replace(/\n/g, "-")
        if (!instruments.includes(n)) {
            if ((n == 'drums' || n == 'double-time' || n == 'half-time') && (instruments.includes('drums') || instruments.includes('double-time') || instruments.includes('half-time'))) {
                return
            }
        }

        if (clicked[index]) {
            setInstruments(instruments.filter(instrument => instrument != n))
        }
        else {
            setInstruments([...instruments, n])
        }
        const newClicked = [...clicked]
        newClicked[index] = !newClicked[index]
        setClicked(newClicked)
    }

    return (
        <div onClick={handleClicked} className="ml-10 mr-10 rounded-lg p-1" style={{backgroundColor: clicked[index] ? 'pink' : '#FFF2F9'}}>
            <img style={{paddingLeft: '20px', paddingRight: '20px'}} src={`/icons/` + name.replace(/\n/g, "-") + `.svg`} height='60px' width='110px' className={styles.pulse}/>
            <p style={{fontFamily: 'Poppins'}} className="text-center text-2xl whitespace-pre-line">{name.charAt(0).toUpperCase() + name.slice(1)}</p>
        </div>
    )
}

export default Instrument