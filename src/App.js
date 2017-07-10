import React, { Component } from 'react'
import base from './base'

import './App.css'
import Main from './Main'
import SignIn from './SignIn'

class App extends Component {
  
  constructor(){
    super()
  
    this.state = {
      notes:{},
      currentNote:this.blankNote(),
      uid: null,
    }
  }
    componentDidMount = () => {
      base.syncState(
        'notes',
        {
          context: this,
          state: 'notes',
        }
      )
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

  deleteCurrentNote = () => {
    const notes = {...this.state.notes}
    notes[this.state.currentNote.id] = null
    this.setState({ notes })
    this.resetCurrentNote()
  }

  signedIn = () => {
    return this.state.uid
  }

  handleAuth = () => {
    this.setState({ uid: 'cconrad' })
  }

  signOut = () => {
    this.setState({ uid: null })
  }

  renderMain = () => {
    const actions = {
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      saveNote: this.saveNote,
      deleteCurrentNote: this.deleteCurrentNote,
      signOut : this.signOut
    }
    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote
    }
    return( <Main 
        {...actions}
        {...noteData}
        />
    )
  }

  render() {
    
    return (
      <div className="App">
        {this.signedIn() ? this.renderMain() : <SignIn handleAuth={this.handleAuth} />}
      </div>
    );
  }
}

export default App;
