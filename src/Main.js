import React from 'react'

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
      <NoteForm
        notes={props.notes}
        currentNoteId={props.currentNoteId}
        saveNote={props.saveNote}
        removeNote={props.removeNote}
      />
    </div>
  )
}

export default Main