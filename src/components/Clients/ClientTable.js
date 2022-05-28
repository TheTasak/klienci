import React from "react"
import Client from "./Client"
import styles from "../Utility/Table.module.css"

export default function ClientTable(props) {
  const obj = props.clients.map((client, i) => {
    return (
      <Client key={client.id}{...client} order={i}/>
    )
  })
  return (
    <div className={styles["table-container"]}>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Imię</td>
            <td>Nazwisko</td>
            <td className={styles["table-element_hide"]}>Telefon</td>
            <td className={styles["table-element_hide"]}>Email</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {obj}
        </tbody>
      </table>
    </div>
  )
}
