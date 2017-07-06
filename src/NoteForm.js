import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component{

  handleChanges = (ev) => {
    const note = {...this.props.currentNote}
    note[ev.target.name] = ev.target.name
    this.props.saveNote(ev)
    }
  render(){

    return(
    <div className="NoteForm">
        <div className="form-actions">
        <button type="button"><i className="fa fa-trash-o" onClick={this.props.deleteCurrentNote}></i>
        </button>
      </div>
      <form>
        <p>
          <input
            type="text" 
            name="title" 
            placeholder="Title your note"
            value={this.props.currentNote.title}
            onChange={this.handleChanges}
          />
        </p>
        <textarea 
          name="body"
          value={this.props.currentNote.body}
          onChange={this.handleChanges}
        ></textarea>
        <button type="submit" onClick={this.props.saveNote}>Submit</button>
      </form>
    </div>
    )
  }
}

export default NoteForm