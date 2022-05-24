import React from "react"
import AddLinkForm from "./AddLinkForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function AddLinkPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <AddLinkForm clientId={params.id}/>
    </React.Fragment>
  )
}
