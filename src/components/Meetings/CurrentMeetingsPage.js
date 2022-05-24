import React from "react"
import axios from 'axios';
import Header from "../Utility/Header"

export default function CurrentMeetingsPage() {
  const [meetings, setMeetings] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/get_current_meetings.php')
         .then( res => setMeetings(res.data))
         .catch( error => console.log(error))
         .then( () => {});
  }, []);
  const obj = meetings.map(meeting => {
    return (
      <div key={meeting.id}>{meeting.data}</div>
    )
  })
  return (
    <div>
      <Header />
      {obj}
    </div>
  )
}
