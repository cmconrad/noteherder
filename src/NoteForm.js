import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component{
    render(){
      const handleClick = () => {
      console.log("clicked")
  }
        return(
        <div className="NoteForm">
            <div className="form-actions">
            <button type="button"><i className="fa fa-trash-o"></i>
            </button>
          </div>
          <form>
            <p>
              <input type="text" name="title" placeholder="Title your note"/>
            </p>
            <textarea name="body"></textarea>
            <button type="submit" onClick={handleClick}>Submit</button>
          </form>
        </div>
        )
    }
}

export default NoteForm