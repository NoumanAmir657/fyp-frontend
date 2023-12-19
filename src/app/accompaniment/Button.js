import styles from "./page.module.css"
import "../globals.css";

const Button = ({text, setDisplayAccom, setDisplaySS}) => {
    const handleClick = () => {
        if (text == 'Accompaniment') {
            setDisplayAccom(true)
            setDisplaySS(false)
        }
        else {
            setDisplayAccom(false)
            setDisplaySS(true)
        }
    }
    return (
        <div className="w-full flex justify-center font-bold">
            <button className={styles.uploadButton} style={{fontFamily: 'Poppins'}} onClick={handleClick} role="button">{text}</button>
        </div>
    )
}

export default Button