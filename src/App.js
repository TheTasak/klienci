import React from "react"
import AddClientPage from "./components/Clients/AddClientPage"
import AddLinkPage from "./components/Links/AddLinkPage"
import ShowPage from "./components/Clients/ShowPage"
import AddMeetingPage from "./components/Meetings/AddMeetingPage"
import CurrentMeetingsPage from "./components/Meetings/CurrentMeetingsPage"
import UpdateClientPage from "./components/Clients/UpdateClientPage"
import ClientDataPage from "./components/Clients/ClientDataPage"
import AddContractPage from "./components/Contracts/AddContractPage"
import { Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<ShowPage />} />
        <Route path="/klienci" element={<ShowPage />} />
        <Route path="/klienci/dodaj" element={<AddClientPage />} />
        <Route path="/klienci/dane" element={<ClientDataPage />}>
          <Route path=":id" element={<ClientDataPage />} />
        </Route>
        <Route path="/klienci/dodaj" element={<AddClientPage />} />
          <Route path="/klienci/edytuj" element={<UpdateClientPage />}>
            <Route path=":id" element={<UpdateClientPage />} />
          </Route>
        <Route path="/powiazania/dodaj" element={<AddLinkPage />}>
          <Route path=":id" element={<AddLinkPage />} />
        </Route>
        <Route path="/spotkania/dodaj" element={<AddMeetingPage />}>
          <Route path=":id" element={<AddMeetingPage />} />
        </Route>
        <Route path="/spotkania/aktualne" element={<CurrentMeetingsPage />} />
        <Route path="/umowy/dodaj" element={<AddContractPage />}>
          <Route path=":id" element={<AddContractPage />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}
