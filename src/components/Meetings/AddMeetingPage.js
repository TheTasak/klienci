import React from "react"
import MeetingForm from "./MeetingForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function AddMeetingPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <MeetingForm clientId={params.id}/>
    </React.Fragment>
  )
}
