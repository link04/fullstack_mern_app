// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import './style.scss';
import ReminderList from './container/ReminderList';
import ReminderForm from './container/ReminderForm';

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    intervalIsSet: false,
    objectToUpdate: null,
    idToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    // Commented out because this obviously has a delay when a change is being made to the db
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    // if (this.state.intervalIsSet) {
    //   clearInterval(this.state.intervalIsSet);
    //   this.setState({ intervalIsSet: null });
    // }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    return axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete
      }
    })
    .then(response => {
      if(response.data.success){
        this.deleteReminderData(idTodelete)
      }
    });
    ;
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    })
    .then(response => this.getDataFromDb());
  };

  updateStateReminders = (reminder) => {
    const newData = [...this.state.data];
    newData.push(reminder);
    this.setState({
      data: newData
    });
  }

  deleteReminderData = (idToDelete) => {
    const newData = this.state.data.filter(data => data.id !== idToDelete);
    this.setState({
      data: newData
    });
  }

updateHandler = (reminderObject) => {
  this.setState({
    objectToUpdate: reminderObject
  })
}

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;

    return (
      <div className="container">
        <h2>Reminders List</h2>
        <ReminderForm updateDB={this.updateDB} objectToUpdate={this.state.objectToUpdate} updateStateReminders={this.updateStateReminders} createHandler={this.putDataToDB} />
          {data.length <= 0 ?
              'No Reminders So Far.'
            :
              <ReminderList list={data} updateHandler={this.updateHandler} deleteHandler={this.deleteFromDB} />
            }
      </div>
    );
  }
}

export default App;
