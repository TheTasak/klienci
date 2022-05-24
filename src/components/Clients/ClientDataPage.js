import React from "react"
import axios from 'axios';
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function ClientDataPage() {
  const [data, setData] = React.useState([]);
  let params = useParams();
  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/get_client_data.php?id=' + params.id)
         .then( res => setData(res.data))
         .catch( error => console.log(error))
         .then( () => {});
  }, []);
  const obj_meetings = data.meetings !== undefined ? data.meetings.map(meeting => <div key={meeting.id}>{meeting.data}</div>) : "";
  const obj_contracts = data.contracts !== undefined ? data.contracts.map(contract => <div key={contract.id}>{contract.id}</div>) : "";
  const obj_links = data.links !== undefined ? data.links.map(link => <div key={link.id}>{link.id}</div>) : "";
  return (
    <div>
      <Header />
      <h2>Spotkania</h2>
      {obj_meetings}
      <h2>Powiązania</h2>
      {obj_links}
      <h2>Kontrakty</h2>
      {obj_contracts}
    </div>
  )
}
