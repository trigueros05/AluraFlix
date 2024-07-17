import { Link } from "react-router-dom";
import styles from "./CabeceraLink.module.css"

function LinkHeader({ url, children }) {
    return (
        <Link to={url} className={styles.linkHeader}>
            {children}

        </Link>
    )
}

export default LinkHeader;