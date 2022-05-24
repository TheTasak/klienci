import React from "react"
import ClientForm from "./ClientForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function UpdateClientPage() {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <ClientForm clientId={params.id}/>
    </React.Fragment>
  )
}
