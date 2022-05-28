import React from "react"
import ContractForm from "./ContractForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function AddContractPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <ContractForm clientId={params.id}/>
    </React.Fragment>
  )
}
