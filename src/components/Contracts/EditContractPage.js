import React from "react"
import ContractForm from "./ContractForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function EditContractPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <ContractForm contractId={params.id}/>
    </React.Fragment>
  )
}
