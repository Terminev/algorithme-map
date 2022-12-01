import React, {useState, useEffect} from 'react'
import socketIO from 'socket.io-client';
import {useParams} from "react-router-dom";
const socket = socketIO.connect('http://localhost:4000');

const Chatbox = (room) => {
  const [allMessage, setAllMessage] = useState([]);
  const {id} = useParams()
  useEffect(() => {
    if(room.room.length > 0) {
      setAllMessage(room.room[0].messages)
    }
  }, [room.room]);

  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('pseudo')) {
      socket.emit('sendMessage', {
        message: message,
        nameUser: localStorage.getItem('pseudo'),
        idRoom: parseInt(id)
      });
    }
    setMessage('');

  };
  return (
    <div className={"chat-box"}>
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ton message"
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendBtn">
            <img src={'../images/send.png'} />
          </button>
        </form>
      <ul>
      { allMessage.map(message =>  (
          <li>
            <span>De {message.name}</span>
            {message.message}
          </li>
        )
      ) }
      </ul>
      
      
    </div>
    
  );
}

export default Chatbox;