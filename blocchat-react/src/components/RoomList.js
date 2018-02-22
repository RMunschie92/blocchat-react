import React, { Component } from 'react';
import '../styles/RoomList.css';
import '../styles/App.css';

class RoomList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: null,
      validUser: null
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  createRoom(e) {
    if ( this.state.newRoomName === '' || this.state.newRoomName === null ) {
      alert("Please enter a valid room name.");
    }
    else if ( this.props.user === null ) {
      alert("Please sign in to create a new room.");
    }
    else {
      this.roomsRef.push({
        name: this.state.newRoomName
      });
      e.preventDefault();
      document.getElementById("new-room-form").reset();
    }
  }

  render() {
    return (
      <section className="rooms-list">
        <h3>Chat Rooms</h3>

        <div className="rooms-list-content">

          <div className="room-names">
            <ul>
              {
                this.state.rooms.map( (room, index) =>
                  <li className={room.key} id={index} key={room.key} data-name={room.name} onClick={(e) => { this.props.handleRoomClick(e)} }>
                    {room.name}
                  </li>
                )
              }
            </ul>
          </div>

          <div className="new-room-form">
            <form id="new-room-form">
              <input type="text" name="new-room-name" placeholder="New room name..." onChange={(e) => { this.handleChange(e)} }/>
              <span onClick={ (e) => { this.createRoom(e) } }><i className="fas fa-plus-circle fa-lg"></i></span>
            </form>
          </div>

        </div>
      </section>
    );
  }
}

export default RoomList;
