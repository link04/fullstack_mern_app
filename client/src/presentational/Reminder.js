import React from 'react';

const Reminder = (props) => {

  return (
    <tr>
      <td>{props.reminder.id}</td>
      <td>{props.reminder.message}</td>
      <td>
        <button className="delete" onClick={() => props.deleteHandler(props.reminder.id)}>
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Reminder;
