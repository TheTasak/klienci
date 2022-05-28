import React from "react"
import LinkForm from "./LinkForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function EditLinkPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <LinkForm linkId={params.id}/>
    </React.Fragment>
  )
}
