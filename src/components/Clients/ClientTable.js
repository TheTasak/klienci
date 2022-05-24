import React from "react"
import Client from "./Client"
import styles from "./ClientTable.module.css"

export default function ClientTable(props) {
  const obj = props.clients.map((client, i) => {
    return (
      <Client key={client.id}{...client} order={i}/>
    )
  })
  return (
    <div className={styles["client_table-container"]}>
      <table className={styles["client_table"]}>
        <tbody>
          {obj}
        </tbody>
      </table>
    </div>
  )
}
