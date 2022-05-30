import React from "react";
import axios from 'axios';
import Select from 'react-select'

export default function LinkForm(props) {
  const [formData, setFormData] = React.useState({
    id_recommendation: "",
    id_source: props.clientId,
    comment: ""
  });
  const [clients, setClients] = React.useState([]);
  const currentClient = clients.filter((client) => client.id == props.clientId)[0];

  const options = clients.map((client) => {
    return {
      value: client.id,
      label: client.imie + " " + client.nazwisko
    }
  });

  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/clients/get_clients.php')
         .then( res => setClients(res.data))
         .catch( error => console.log(error))
         .then( () => {});
    if(props.linkId !== undefined) {
      axios.get('http://localhost/serwer_klienci/links/get_link.php?id=' + props.linkId)
           .then( res => {
              setFormData({
                id_recommendation: res.data.id_polecany,
                id_source: res.data.id_zrodlo,
                comment: res.data.komentarz == undefined ? "" : res.data.komentarz
              });
              console.log(res);
            })
           .catch( error => console.log(error))
           .then( () => {});
     }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if(props.linkId !== undefined) {
      axios.put('http://localhost/serwer_klienci/links/update_link.php?id=' + props.linkId, formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
    } else {
      if(formData.id_recommendation === ""){
        setFormData(oldFormData => {
          return {
            ...oldFormData,
            id_recommendation : clients[0].id
          }
        });
      }
      axios.post('http://localhost/serwer_klienci/links/add_link.php', formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
      setFormData({
        id_recommendation: "",
        id_source: props.clientId,
        comment: ""
      });
    }

  }
  function handleInput(event, selector) {
    if(selector != undefined && selector === "id") {
      setFormData(oldFormData => {
        return {
          ...oldFormData,
          id_recommendation : event.value
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
      <h2>Dodaj rekomendacje</h2>
      <div>
        {currentClient && <input type="text" value={currentClient.imie + " " + currentClient.nazwisko} disabled/>}
      </div>
      <div className="select">
        <Select options={options} name="id_recommendation" name="id_recommendation" placeholder="Rekomendowany:" defaultValue={formData.id_recommendation} onChange={event => handleInput(event, "id")}/>
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
