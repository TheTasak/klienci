import React from "react";
import axios from 'axios';

export default function ClientForm(props) {
  const [formData, setFormData] = React.useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    age: ""
  })
  React.useEffect(() => {
    if(props.clientId !== undefined) {
      axios.post('http://localhost/serwer_klienci/clients/get_client.php?id=' + props.clientId)
           .then( res => setFormData({
             name: res.data.imie,
             surname: res.data.nazwisko,
             email: res.data.email == undefined ? "" : res.data.email,
             phone: res.data.telefon == undefined ? "" : res.data.telefon,
             age: res.data.wiek == undefined ? "" : res.data.wiek
           }))
           .catch( error => console.log(error))
           .then( () => {});
    }
  }, [])
  function handleSubmit(event) {
    event.preventDefault();
    if(props.clientId !== undefined) {
      axios.put('http://localhost/serwer_klienci/clients/update_client.php?id=' + props.clientId, formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
    } else {
      axios.post('http://localhost/serwer_klienci/clients/add_client.php', formData)
           .then( res => console.log(res.data))
           .catch( error => console.log(error))
           .then( () => {});
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        age: ""
      })
    }
  }
  function handleInput(event) {
    setFormData(oldFormData => {
      return {
        ...oldFormData,
        [event.target.name] : event.target.value
      }
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      {props.clientId ? <h2>Edytuj klienta</h2> : <h2>Dodaj klienta</h2>}
      <div>
        <label htmlFor="name">Imię*</label>
        <input type="text" name="name" id="name" value={formData.name} onChange={handleInput} required/>
      </div>
      <div>
        <label htmlFor="surname">Nazwisko*</label>
        <input type="text" name="surname" id="surname" value={formData.surname} onChange={handleInput} required/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={formData.email} onChange={handleInput} />
      </div>
      <div>
        <label htmlFor="phone">Numer telefonu</label>
        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInput} pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" />
      </div>
      <div>
        <label htmlFor="age">Wiek</label>
        <input type="number" name="age" id="age" value={formData.age} onChange={handleInput} />
      </div>
      <div>
        <button type="submit">Wyślij</button>
      </div>
  </form>
  )
}
