import React, { Component } from 'react';
import Reminder from '../presentational/Reminder';

class ReminderList extends Component {

  render(){

    const reminders = this.props.list.map(reminder => <Reminder deleteHandler={this.props.deleteHandler} updateHandler={this.props.updateHandler} key={reminder.id} reminder={reminder} /> );

    return(
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reminder</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {reminders.reverse()}
        </tbody>
      </table>
    )
  }
}

export default ReminderList;
