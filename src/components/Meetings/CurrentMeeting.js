import React from "react"
import { Link } from "react-router-dom"
import styles from "../Utility/Table.module.css"

export default function CurrentMeeting(props) {
  return (
    <React.Fragment>
      <tr>
        <td className={styles["table-order_number"]}>{props.order+1}</td>
        <td>{props.imie + " " + props.nazwisko}</td>
        <td>{props.telefon}</td>
        <td>{props.data}</td>
        <td>{props.komentarz}</td>
        <td className={styles["table-button_container"]}>
          <Link to={"/spotkania/edytuj/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-edit"></i>
          </Link>
          <Link to={"/spotkania/usun/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-trash"></i>
          </Link>
        </td>
      </tr>
    </React.Fragment>
  )
}
