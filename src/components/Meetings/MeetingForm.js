import React from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Select from 'react-select'
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import 'moment/locale/pl';

export default function MeetingForm(props) {
  const [formData, setFormData] = React.useState({
    datetime: "",
    client_id: props.clientId,
    type: 0,
    comment: ""
  });

  const [clients, setClients] = React.useState([]);
  const currentClient = clients.filter((client) => client.id == props.clientId)[0];
  const navigate = useNavigate();

  const options = [
    {
      value: 0,
      label: "Pierwsze spotkanie"
    },
    {
      value: 1,
      label: "Drugie spotkanie"
    },
    {
      value: 2,
      label: "Doradctwo"
    },
    {
      value: 3,
      label: "Umowa"
    }
  ];

  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/clients/get_clients.php')
         .then( res => setClients(res.data))
         .catch( error => console.log(error))
         .then( () => {});
    if(props.meetingId !== undefined) {
       axios.get('http://localhost/serwer_klienci/meetings/get_meeting.php?id=' + props.meetingId)
            .then( res => {
               setFormData({
                 datetime: res.data.data,
                 client_id: res.data.id_klienta,
                 type: res.data.typ,
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
      axios.put('http://localhost/serwer_klienci/meetings/update_meeting.php?id=' + props.meetingId, formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
    } else {
      axios.post('http://localhost/serwer_klienci/meetings/add_meeting.php', formData)
           .then( res => window.location.replace(res.data))
           .catch( error => console.log(error))
           .then( () => {});
      setFormData({
        datetime: "",
        client_id: props.clientId,
        type: 0,
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
    } else if(selector !== undefined && selector === "type") {
      setFormData(oldFormData => {
        return {
          ...oldFormData,
          type : event.value
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
      <div className="select">
        <label>Typ spotkania: </label>
        <Select options={options} name="type" placeholder="Wybierz:" defaultValue={formData.type} onChange={event => handleInput(event, "type")} />
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
