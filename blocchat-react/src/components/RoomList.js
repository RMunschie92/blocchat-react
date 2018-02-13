import React, { Component } from 'react';

class RoomList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
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
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    e.preventDefault();
  }

  render() {
    return (
      <section className="rooms-list">
        <div className="room-names">
          <h3>Room List</h3>
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
          <form>
            <input type="text" name="new-room-name" placeholder="New room name..." onChange={(e) => { this.handleChange(e)} }/>
            <input type="submit" value="New Room" onClick={ (e) => { this.createRoom(e) } }/>
          </form>
        </div>
      </section>
    );
  }
}

export default RoomList;
