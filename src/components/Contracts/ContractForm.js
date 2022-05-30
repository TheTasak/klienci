import React from "react";
import axios from 'axios';
import Select from 'react-select'

export default function ContractForm(props) {
  const [clients, setClients] = React.useState([]);
  let propClient = props.clientId;

  const [formData, setFormData] = React.useState({
    client_id: propClient,
    points: "",
    finished: "1",
    comment: ""
  });

  const currentClient = clients.filter((client) => client.id == propClient)[0];
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

  React.useEffect(() => {
    axios.get('http://localhost/serwer_klienci/clients/get_clients.php')
         .then( res => setClients(res.data))
         .catch( error => console.log(error))
         .then( () => {});
    if(props.contractId !== undefined) {
      axios.get('http://localhost/serwer_klienci/contracts/get_contract.php?id=' + props.contractId)
           .then( res => {
             setFormData({
               client_id: res.data.id_klienta,
               points: res.data.punkty,
               finished: res.data.zakonczone,
               comment: res.data.komentarz == undefined ? "" : res.data.komentarz
             });
             if(propClient == undefined) {
               propClient = formData.client_id;
             }
           })
           .catch( error => console.log(error))
           .then( () => {});
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if(props.contractId !== undefined) {
      axios.put('http://localhost/serwer_klienci/contracts/update_contract.php?id=' + props.contractId, formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
    } else {
      axios.post('http://localhost/serwer_klienci/contracts/add_contract.php', formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
      setFormData({
        client_id: propClient,
        points: "",
        finished: "1",
        comment: ""
      })
    }
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

  return (
    <form onSubmit={handleSubmit}>
      {props.contractId ? <h2>Edytuj umowę</h2> : <h2>Dodaj umowę</h2>}
      <div>
        {currentClient && <input type="text" value={currentClient.imie + " " + currentClient.nazwisko} disabled/>}
      </div>
      <div>
        <label htmlFor="points">Punkty</label>
        <input type="number" name="points" id="points" value={formData.points} onChange={handleInput} />
      </div>
      <div>
        <label>Zakończone: </label>
        <Select options={options} name="finished" placeholder="Wybierz:" defaultValue={formData.finished} onChange={event => handleInput(event, "finished")} />
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
