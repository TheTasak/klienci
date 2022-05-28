import React from "react"
import MeetingForm from "./MeetingForm"
import { useParams } from "react-router-dom";
import Header from "../Utility/Header"

export default function EditMeetingPage(props) {
  let params = useParams();
  return (
    <React.Fragment>
      <Header />
      <MeetingForm meetingId={params.id}/>
    </React.Fragment>
  )
}
