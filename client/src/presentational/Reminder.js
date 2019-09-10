import React from 'react';

const Reminder = (props) => {

  return (
    <tr>
      <td>{props.reminder.id}</td>
      <td>{props.reminder.message}</td>
    </tr>
  )
}

export default Reminder;
