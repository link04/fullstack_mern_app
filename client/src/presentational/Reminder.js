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
        <button className="update"
            onClick={() =>
              props.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
          Update
        </button>
      </td>
    </tr>
  )
}

export default Reminder;
