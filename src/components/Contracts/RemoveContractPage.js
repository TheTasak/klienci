import React from "react"
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Utility/Header"

export default function RemoveContractPage() {
  let params = useParams();
  const navigate = useNavigate();
  function remove() {
    axios.delete('http://localhost/serwer_klienci/delete_contract.php?id=' + params.id)
         .then( res => console.log(res))
         .catch( error => console.log(error))
         .then( () => {});
    navigate(-1);
  }
  return (
    <React.Fragment>
      <Header />
      <div>
        <button type="button" onClick={remove}>Usuń</button>
      </div>
    </React.Fragment>
  )
}
