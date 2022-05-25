import React from "react"
import { Link } from "react-router-dom"
import styles from "../Utility/Table.module.css"

export default function LinkElement(props) {
  return (
    <React.Fragment>
      <tr>
        <td className={styles["table-order_number"]}>{props.order+1}</td>
        <td>{props.imie + " " + props.nazwisko}</td>
        <td>{props.arranged ? "TAK" : "NIE"}</td>
        <td>{props.komentarz}</td>
        <td className={styles["table-button_container"]}>
          <Link to={"/powiazania/edytuj/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-edit"></i>
          </Link>
          <Link to={"/powiazania/usun/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-trash"></i>
          </Link>
        </td>
      </tr>
    </React.Fragment>
  )
}
