import React, { Component } from 'react';

class ReminderForm extends Component {

  state = {
    message: ''
  }

  createHandler = () => {
    this.props.createHandler(this.state.message)
    .then(response => JSON.parse(response.config.data))
    .then(parsedResponse => {
      this.props.updateStateReminders(parsedResponse);
      this.setState({message: ''})
    })
  }

  updateHandler = () => {
    this.props.updateDB(this.props.objectToUpdate.id, this.state.message);
    this.setState({message: ''});
  }

  componentDidUpdate(prevProps){
    if(this.props.objectToUpdate !== prevProps.objectToUpdate){
      this.setState({ message: this.props.objectToUpdate.message });
    }
  }


  render(){

    return(
      <div >
        <input
          type="text"
          onChange={(e) => this.setState({ message: e.target.value })}
          placeholder="Reminder"
          value={this.state.message}
        />

      <button className="create" onClick={() => this.props.objectToUpdate ? this.updateHandler() : this.createHandler() }>
          {this.props.objectToUpdate ? 'Update' : 'Create' }
        </button>
      </div>
    )
  }

}

export default ReminderForm;
