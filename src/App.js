import React, { Component } from 'react'

import './App.css'
import Main from './Main'

class App extends Component {
  
  constructor(){
    super()

  const please = (props) => {

  }

    this.state = {
      notes:{},
      currentNote:this.blankNote(),
    }
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  blankNote = () => {
    return {
      id: null,
      title:'',
      body:'',
    }
  }

  resetCurrentNote = () => {
    this.setCurrentNote(this.blankNote())
  }

  saveNote = (note) => {
    const notes = {...this.state.notes}
    if (!note.id) {
      note.id = `note-${Date.now()}`
    }
    notes[note.id] = note

    this.setState({ 
      notes,
      currentNote: note,
    })
  }

  deleteNote = () => {
    const notes = {...this.state.notes}
    delete notes[this.state.currentNote.id]
    this.setState({ notes })
  }

  render() {
    const actions = {
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      saveNote: this.saveNote,
      deleteNote: this.deleteNote,
    }
    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote
    }
    return (
      <div className="App">
      <Main 
        {...actions}
        {...noteData}
        />
      </div>
    );
  }
}

export default App;
