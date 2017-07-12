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
        resetCurrentNote={props.resetCurrentNote}
        signOut={props.signOut}
      />
      <NoteList
        notes={props.notes}
        setCurrentNoteId={props.setCurrentNoteId}
      />


      <Switch>
        <Route path="/notes/:id" render={(navProps) =>  (     
          <NoteForm
            notes={props.notes}
            currentNoteId={props.currentNoteId}
            saveNote={props.saveNote}
            removeNote={props.removeNote}
            {...navProps}
          />
        )}/>
         <Route render={(navProps) => (
           <NoteForm
            notes={props.notes}
            currentNoteId={props.currentNoteId}
            saveNote={props.saveNote}
            removeNote={props.removeNote}
            {...navProps}
          />
           )}/>
      </Switch>
    </div>
  )
}

export default Main