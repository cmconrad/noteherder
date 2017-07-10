import React, { Component } from 'react'
import base, { auth } from './base'

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
    componentWillMount = () => {
      auth.onAuthStateChanged(
        (user) => {
          if (user){
            //signed in
            this.handleAuth(user)

          } else {
            //signed out
            this.setState({ uid: null })
          }
        }
      )
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

  handleAuth = (user) => {
    this.setState({ uid: user.uid })
  }

  signOut = () => {
    auth.signOut()
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
        {this.signedIn() ? this.renderMain() : <SignIn />}
      </div>
    );
  }
}

export default App;
