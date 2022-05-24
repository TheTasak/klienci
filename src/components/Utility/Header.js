import React from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Header.module.css"

export default function Header() {
  const currentLocation = useLocation();
  return (
    <header>
      <Link to="/klienci/dodaj">
        <div className={styles["header--button"]}>
            <span>Dodaj klienta</span>
        </div>
      </Link>
      <Link to="/klienci">
        <div className={styles["header--button"]}>
            <span>Klienci</span>

        </div>
      </Link>
      <Link to="/spotkania/aktualne">
        <div className={styles["header--button"]}>
            <span>Aktualne spotkania</span>
        </div>
      </Link>
      <Link to="/about">
        <div className={styles["header--button"] + " " + styles["header--lastbutton"]}>
            <span>Dashboard</span>
        </div>
      </Link>
    </header>
  )
}
