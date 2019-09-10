import React, { Component } from 'react';
import Reminder from '../presentational/Reminder';

class ReminderList extends Component {

  render(){

    const reminders = this.props.list.map(reminder => <Reminder key={reminder.id} reminder={reminder} /> );

    return(
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reminder</th>
          </tr>
        </thead>
        <tbody>
          {reminders}
        </tbody>
      </table>
    )
  }
}

export default ReminderList;
