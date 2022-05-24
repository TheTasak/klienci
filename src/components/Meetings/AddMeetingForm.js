import React from "react";
import axios from 'axios';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import 'moment/locale/pl';

export default function AddMeetingForm(props) {
  const [formData, setFormData] = React.useState({
    datetime: "",
    client_id: props.clientId,
    comment: ""
  });
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/get_clients.php')
         .then( res => setClients(res.data))
         .catch( error => console.log(error))
         .then( () => {});
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost/serwer_klienci/add_meeting.php', formData)
         .then( res => console.log(res.data))
         .catch( error => console.log(error))
         .then( () => {});
    setFormData({
      datetime: "",
      client_id: props.clientId,
      comment: ""
    })
  }
  function handleInput(event, selector) {
    if(selector !== undefined && selector === "date") {
      setFormData(oldFormData => {
        return {
          ...oldFormData,
          datetime: event.format("YYYY-MM-DD HH-mm")
        }
      });
    } else {
      setFormData(oldFormData => {
        return {
          ...oldFormData,
          [event.target.name] : event.target.value
        }
      });
    }
  }
  const currentClient = clients.filter((client) => client.id == props.clientId)[0];
  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj spotkanie</h2>
      <div>
        <label>Klient</label>
        {currentClient && <input type="text" value={currentClient.imie + " " + currentClient.nazwisko} disabled/>}
      </div>
      <div className="fullWidth">
        <label htmlFor="datetime">Data i czas</label>
        <DateTime name="datetime" id="datetime" onChange={event => handleInput(event, "date")}/>
      </div>
      <div>
        <label htmlFor="comment">Komentarz</label>
        <input type="text" name="comment" id="comment" value={formData.comment} onChange={handleInput} required/>
      </div>
      <div>
        <button type="submit">Wyślij</button>
      </div>
  </form>
  )
}
