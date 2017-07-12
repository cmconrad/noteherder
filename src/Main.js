import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './Main.css'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
  return (
    <div className="Main">
      <Sidebar
        signOut={props.signOut}
      />
      <NoteList
        notes={props.notes}
      />


      <Switch>
        <Route path="/notes/:id" render={(navProps) =>  (     
          <NoteForm
            notes={props.notes}
            saveNote={props.saveNote}
            removeNote={props.removeNote}
            firebaseSyncedNotes={props.firebaseSyncedNotes}
            {...navProps}
          />
        )}/>
         <Route render={(navProps) => (
           <NoteForm
            notes={props.notes}
            saveNote={props.saveNote}
            removeNote={props.removeNote}
            firebaseSyncedNotes={props.firebaseSyncedNotes}
            {...navProps}
          />
           )}/>
      </Switch>
    </div>
  )
}

export default Main