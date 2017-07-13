import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import base, { auth } from './base'

import './App.css'
import Main from './Main'
import SignIn from './SignIn'

class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      uid: null,
      firebaseNotesSynced: false,
    }
  }

  componentWillMount = () => {
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // signed in
          this.handleAuth(user)
        } else {
          // signed out
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
        context: this,  // what object the state is on
        state: 'notes', // which property to sync
        then: () => this.setState({ firebaseNotesSynced: true })
      }
    )
  }

  saveNote = (note) => {
    const timestamp = Date.now()
    let shouldRedirect = false
    const notes = {...this.state.notes}
    if (!note.id) {
      note.id = timestamp
      shouldRedirect = true
    }

    note.updatedAt = timestamp
    notes[note.id] = note

    if (shouldRedirect){
      this.props.history.push(`/notes/${note.id}`)
      shouldRedirect = false
    }
    this.setState({ notes })
    
  }

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null

    this.setState({ notes })
    this.props.history.push('/notes')
  }

  signedIn = () => {
    return this.state.uid
  }

  handleAuth = (user) => {
    localStorage.setItem('uid', user.uid)
    this.setState(
      { uid: user.uid },
      this.syncNotes
    )
  }

  handleUnauth = () => {
    localStorage.removeItem('uid')
    if (this.bindingRef) {
      base.removeBinding(this.bindingRef)
    }

    this.setState({
      uid: null,
      notes: {},
    })
  }

  signOut = () => {
    auth.signOut()
  }

  renderMain() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      signOut: this.signOut,

    }

    return (
      <Main
        {...actions}
         notes={this.state.notes}
        firebaseNotesSynced={this.state.firebaseNotesSynced}
      />
    )
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/sign-in" render={() => (
            this.signedIn()
              ? <Redirect to="/notes"/>
              : <SignIn />
          )}/>
          <Route path="/notes" render={() => (
            this.signedIn()
              ? this.renderMain()
              : <Redirect to="/sign-in"/>
          )}/>
          <Route render={() => <Redirect to="/notes"/> }/>
        </Switch>
      </div>
    )
  }
}

export default App