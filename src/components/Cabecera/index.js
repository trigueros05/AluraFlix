
import { Link } from "react-router-dom"
import styles from "./Cabecera.module.css"
import logo from "./logo.png"
import LinkHeader from "../CabeceraLink/index";

function Cabecera() {
    return (
        <header className={styles.cabecera}>
            <Link to="/">
                <section className={styles.logoContainer}>
                    <img src={logo} alt="AluraFlix" />
                </section>
            </Link>
            <nav>
                <LinkHeader url="./" >
                    <button className={styles.buttonHome} >
                        Home
                    </button>
                </LinkHeader>
                <LinkHeader url="./NuevoVideo" >
                    <button className={styles.buttonNuevoVideo} >
                        Nuevo Video
                    </button>
                </LinkHeader>

            </nav>
        </header>
    )
}

export default Cabecera;