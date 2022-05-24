import React from "react"
import AddContractForm from "./AddContractForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function AddContractPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <AddContractForm clientId={params.id}/>
    </React.Fragment>
  )
}
