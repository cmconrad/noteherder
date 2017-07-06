import React, { Component } from 'react'

import './App.css'
import Main from './Main'

class App extends Component {
  
  constructor(){
    super()

  const please = (props) => {

  }

    this.state = {
      notes:{
        'note-1':{
            id: 'note-1',
            title: 'My fancy note from App',
            body: 'This note is so fancy!',
        },
        'note-2':{
            id: 'note-2',
            title:'Another one from App',
            body:'Also very fancy',
        },
      },
      currentNote:this.blankNote(),
    }
  }

  setCurrentNote = (note) =>{
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

  render() {
    const actions = {
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote
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
