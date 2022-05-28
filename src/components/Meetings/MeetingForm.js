import React from "react";
import axios from 'axios';
import DateTime from 'react-datetime';
import {useNavigate} from "react-router-dom";
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import 'moment/locale/pl';

export default function MeetingForm(props) {
  const [formData, setFormData] = React.useState({
    datetime: "",
    client_id: props.clientId,
    comment: ""
  });

  const [clients, setClients] = React.useState([]);
  const currentClient = clients.filter((client) => client.id == props.clientId)[0];
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/get_clients.php')
         .then( res => setClients(res.data))
         .catch( error => console.log(error))
         .then( () => {});
    if(props.meetingId !== undefined) {
       axios.get('http://localhost/serwer_klienci/get_meeting.php?id=' + props.meetingId)
            .then( res => {
               setFormData({
                 datetime: res.data.data,
                 client_id: res.data.id_klienta,
                 comment: res.data.komentarz == undefined ? "" : res.data.komentarz
               });
            })
            .catch( error => console.log(error))
            .then( () => {});
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if(props.meetingId !== undefined) {
      axios.put('http://localhost/serwer_klienci/update_meeting.php?id=' + props.meetingId, formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
    } else {
      axios.post('http://localhost/serwer_klienci/add_meeting.php', formData)
           .then( res => window.location.replace(res.data))
           .catch( error => console.log(error))
           .then( () => {});
      setFormData({
        datetime: "",
        client_id: props.clientId,
        comment: ""
      })
    }
  }
  function handleInput(event, selector) {
    if(selector !== undefined && selector === "date") {
      setFormData(oldFormData => {
        return {
          ...oldFormData,
          datetime: event.format("YYYY-MM-DD HH:mm:ss")
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
  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj spotkanie</h2>
      <div>
        {currentClient && <input type="text" value={currentClient.imie + " " + currentClient.nazwisko} disabled/>}
      </div>
      <div className="fullWidth">
        <label htmlFor="datetime">Data i czas</label>
        <DateTime name="datetime" id="datetime" onChange={event => handleInput(event, "date")} value={Date.parse(formData.datetime)}/>
      </div>
      <div>
        <label htmlFor="comment">Komentarz</label>
        <input type="text" name="comment" id="comment" value={formData.comment} onChange={handleInput}/>
      </div>
      <div>
        <button type="submit">Wyślij</button>
      </div>
  </form>
  )
}
