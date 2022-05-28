import React from "react"
import { Routes, Route } from "react-router-dom"

import AddClientPage from "./components/Clients/AddClientPage"
import EditClientPage from "./components/Clients/EditClientPage"
import ClientDataPage from "./components/Clients/ClientDataPage"

import AddLinkPage from "./components/Links/AddLinkPage"
import EditLinkPage from "./components/Links/EditLinkPage"
import RemoveLinkPage from "./components/Links/RemoveLinkPage"

import AddContractPage from "./components/Contracts/AddContractPage"
import EditContractPage from "./components/Contracts/EditContractPage"
import RemoveContractPage from "./components/Contracts/RemoveContractPage"

import AddMeetingPage from "./components/Meetings/AddMeetingPage"
import EditMeetingPage from "./components/Meetings/EditMeetingPage"
import CurrentMeetingsPage from "./components/Meetings/CurrentMeetingsPage"
import RemoveMeetingPage from "./components/Meetings/RemoveMeetingPage"
import MeetingCalendarRedirect from "./components/Meetings/MeetingCalendarRedirect"

import ShowPage from "./components/Clients/ShowPage"

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
        <Route path="/klienci/edytuj" element={<EditClientPage />}>
          <Route path=":id" element={<EditClientPage />} />
        </Route>
        <Route path="/powiazania/dodaj" element={<AddLinkPage />}>
          <Route path=":id" element={<AddLinkPage />} />
        </Route>
        <Route path="/powiazania/edytuj" element={<EditLinkPage />}>
          <Route path=":id" element={<EditLinkPage />} />
        </Route>
        <Route path="/powiazania/usun" element={<RemoveLinkPage />}>
          <Route path=":id" element={<RemoveLinkPage />} />
        </Route>
        <Route path="/umowy/dodaj" element={<AddContractPage />}>
          <Route path=":id" element={<AddContractPage />} />
        </Route>
        <Route path="/umowy/edytuj" element={<EditContractPage />}>
          <Route path=":id" element={<EditContractPage />} />
        </Route>
        <Route path="/umowy/usun" element={<RemoveContractPage />}>
          <Route path=":id" element={<RemoveContractPage />} />
        </Route>
        <Route path="/spotkania/dodaj" element={<AddMeetingPage />}>
          <Route path=":id" element={<AddMeetingPage />} />
        </Route>
        <Route path="/spotkania/edytuj" element={<EditMeetingPage />}>
          <Route path=":id" element={<EditMeetingPage />} />
        </Route>
        <Route path="/spotkania/usun" element={<RemoveMeetingPage />}>
          <Route path=":id" element={<RemoveMeetingPage />} />
        </Route>
        <Route path="/spotkania/kalendarz/dodaj" element={<MeetingCalendarRedirect />}>
          <Route path=":id" element={<MeetingCalendarRedirect />} />
        </Route>
        <Route path="/spotkania/aktualne" element={<CurrentMeetingsPage />} />
      </Routes>
    </React.Fragment>
  )
}
