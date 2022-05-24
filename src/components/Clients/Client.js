import React from "react"
import { Link, useLocation } from "react-router-dom"
import styles from "./Client.module.css"

export default function Client(props) {
  return (
    <React.Fragment>
      <tr>
        <td className={styles["table-order_number"]}>{props.order+1}</td>
        <td>{props.imie}</td>
        <td>{props.nazwisko}</td>
        <td className={styles["table-element_hide"]}>{props.telefon}</td>
        <td className={styles["table-element_hide"]}>{props.email}</td>
        <td className={styles["table-button_container"]}>
          <Link to={"/powiazania/dodaj/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-user-plus"></i>
          </Link>
          <Link to={"/spotkania/dodaj/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-calendar-plus"></i>
          </Link>
          <Link to={"/umowy/dodaj/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-file-signature"></i>
          </Link>
          <Link to={"/klienci/dane/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-circle-info"></i>
          </Link>
          <Link to={"/klienci/edytuj/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-edit"></i>
          </Link>
        </td>
      </tr>
    </React.Fragment>
  )
}
