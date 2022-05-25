import React from "react"
import axios from 'axios';
import ClientTable from "./ClientTable"
import Header from "../Utility/Header"

export default function ShowPage() {
  const [clients, setClients] = React.useState([]);
  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/get_clients.php')
         .then( res => setClients(res.data))
         .catch( error => console.log(error))
         .then( () => {});
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ClientTable clients={clients} />
    </React.Fragment>
  )
}
