import styles from "./Footer.module.css"
import logo from "./logo.png"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


function PieDePagina() {
    return (
        <footer className={styles.footerContainer}>
            <img src={logo} alt="Logo de la empresa" className={styles.logo} />

        </footer>
    )

}

export default PieDePagina