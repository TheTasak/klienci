import React from "react";
import axios from 'axios';
import Select from 'react-select'

export default function AddMeetingForm(props) {
  const [formData, setFormData] = React.useState({
    client_id: props.clientId,
    points: "",
    finished: "1",
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
    axios.post('http://localhost/serwer_klienci/add_contract.php', formData)
         .then( res => console.log(res.data))
         .catch( error => console.log(error))
         .then( () => {});
    setFormData({
      client_id: props.clientId,
      points: "",
      finished: "1",
      comment: ""
    })
  }
  function handleInput(event, selector) {
    if(selector !== undefined && selector === "finished") {
      setFormData(oldFormData => {
        return {
          ...oldFormData,
          finished : event.value
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

  const options = [
    {
      value: "1",
      label: "Tak"
    },
    {
      value: "0",
      label: "Nie"
    }
  ];
  const currentClient = clients.filter((client) => client.id == props.clientId)[0];
  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj umowę</h2>
      <div>
        {currentClient && <input type="text" value={currentClient.imie + " " + currentClient.nazwisko} disabled/>}
      </div>
      <div>
        <label htmlFor="points">Punkty</label>
        <input type="number" name="points" id="points" value={formData.points} onChange={handleInput} />
      </div>
      <div>
        <label>Zakończone: </label>
        <Select options={options} name="id_recommendation" value={formData.id_recommendation} onChange={event => handleInput(event, "finished")} label="Wybierz rekomendacje"/>
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
