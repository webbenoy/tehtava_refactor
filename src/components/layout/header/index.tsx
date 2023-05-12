import React from "react";
import styles from './header.module.css';
import logo from "../../../images/droppe-logo.png";

export default function Header() {
    return (
        <div className={styles.header}>
            <div className={['container', styles.headerImageWrapper].join(' ')}>
                <img src={logo} className={styles.headerImage} />
            </div>
        </div>
    );
}