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
        <tbody>
          {obj}
        </tbody>
      </table>
    </div>
  )
}
