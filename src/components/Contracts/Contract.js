import React from "react"
import { Link } from "react-router-dom"
import styles from "../Utility/Table.module.css"

export default function Contract(props) {
  return (
    <React.Fragment>
      <tr>
        <td className={styles["table-order_number"]}>{props.order+1}</td>
        <td>{props.punkty}</td>
        <td>{props.komentarz}</td>
        <td>{props.zakonczone ? "TAK" : "NIE"}</td>
        <td className={styles["table-button_container"]}>
          <Link to={"/umowy/edytuj/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-edit"></i>
          </Link>
          <Link to={"/umowy/usun/" + props.id} className={styles["table-button"]}>
            <i className="fas fa-trash"></i>
          </Link>
        </td>
      </tr>
    </React.Fragment>
  )
}
