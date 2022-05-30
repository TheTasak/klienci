import React from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"
import Meeting from "../Meetings/Meeting"
import LinkElement from "../Links/LinkElement"
import Contract from "../Contracts/Contract"

import styles from "../Utility/Table.module.css"

export default function ClientDataPage() {
  const [data, setData] = React.useState([]);
  let params = useParams();

  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/clients/get_client_data.php?id=' + params.id)
         .then( res => setData(res.data))
         .catch( error => console.log(error))
         .then( () => {});
  }, [params.id]);

  const obj_meetings = data.meetings !== undefined ? data.meetings.map((meeting, i) => <Meeting key={meeting.id} {...meeting} order={i} />) : <tr></tr>;
  const obj_contracts = data.contracts !== undefined ? data.contracts.map((contract, i) => <Contract key={contract.id} {...contract} order={i} />) : <tr></tr>;
  const obj_links = data.links !== undefined ? data.links.map((link, i) => <LinkElement key={link.id} {...link} order={i} />) : <tr></tr>;

  return (
    <React.Fragment>
      <Header />
      <h2 className={styles["table-title"]}>Spotkania</h2>
      <div className={styles["table-container"]}>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Data</td>
              <td>Komentarz</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {obj_meetings}
          </tbody>
        </table>
      </div>
      <h2 className={styles["table-title"]}>Rekomendacje</h2>
      <div className={styles["table-container"]}>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Imię i nazwisko</td>
              <td>Umówione</td>
              <td>Komentarz</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {obj_links}
          </tbody>
        </table>
      </div>
      <h2 className={styles["table-title"]}>Umowy</h2>
      <div className={styles["table-container"]}>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Punkty</td>
              <td>Komentarz</td>
              <td>Ukończone</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {obj_contracts}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}
