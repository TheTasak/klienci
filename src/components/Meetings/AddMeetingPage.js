import React from "react"
import AddMeetingForm from "./AddMeetingForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function AddMeetingPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <AddMeetingForm clientId={params.id}/>
    </React.Fragment>
  )
}
