import React from "react"
import axios from 'axios';
import Header from "../Utility/Header"
import CurrentMeeting from "./CurrentMeeting"

import styles from "../Utility/Table.module.css"

export default function CurrentMeetingsPage() {
  const [meetings, setMeetings] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/get_current_meetings.php')
         .then( res => setMeetings(res.data))
         .catch( error => console.log(error))
         .then( () => {});
  }, []);
  const obj = meetings.map((meeting, i) => <CurrentMeeting key={meeting.id} order={i} {...meeting}/>)
  return (
    <React.Fragment>
      <Header />
      <div className={styles["table-container"]}>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>Imię i nazwisko</td>
              <td>Telefon</td>
              <td>Data</td>
              <td>Komentarz</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {obj}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}
