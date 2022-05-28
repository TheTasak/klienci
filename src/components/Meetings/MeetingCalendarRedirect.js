import React from "react"
import axios from "axios"
import { useSearchParams, useNavigate } from "react-router-dom"
import Header from "../Utility/Header"

export default function MeetingCalendarRedirect() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const obj = {
    id: searchParams.get("state"),
    code: searchParams.get("code"),
    scope: searchParams.get("scope")
  }

  React.useEffect(() => {
    axios.post('http://localhost/serwer_klienci/add_calendar_event.php', obj)
         .then( res => {
           if(res.status == 200) {
             navigate("/klienci");
           }
         })
         .catch( error => console.log(error))
         .then( () => {});
  }, [])
  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  )
}
