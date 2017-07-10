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
      this.getUserFromLocalStorage()
      auth.onAuthStateChanged(
        (user) => {
          if (user){
            this.handleAuth(user)

          } else {
            this.handleUnauth()
          }
        }
      )
    }

    getUserFromLocalStorage = () => {
      const uid = localStorage.getItem('uid')
      if (!uid) return
      this.setState({ uid })
    }

    syncNotes = () => {
      this.bindingRef = base.syncState(
        `notes/${this.state.uid}`,
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

    this.setState({ notes })
    this.setCurrentNote(note)
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
    localStorage.setItem('uid', user.uid)
    this.setState({ uid: user.uid }, this.syncNotes )
  }

  handleUnauth = () => {
    localStorage.removeItem('uid')
    if (this.bindingRef){
     base.removeBinding(this.bindingRef)
    }
    
    this.setState({ uid: null,
    currentNote: this.blankNote(),
    notes: {} })

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
