import React, { Component } from 'react';

class ReminderForm extends Component {

  state = {
    message: null
  }

createHandler = () => {

  this.props.createHandler(this.state.message)
  .then(response => JSON.parse(response.config.data))
  .then(parsedResponse => this.props.updateStateReminders(parsedResponse))


}

  render(){
    return(
      <div >
        <input
          type="text"
          onChange={(e) => this.setState({ message: e.target.value })}
          placeholder="Reminder"
        />

      <button className="create" onClick={(event) => this.createHandler()}>
          Create
        </button>
      </div>
    )
  }

}

export default ReminderForm;
