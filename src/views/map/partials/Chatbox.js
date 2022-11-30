import React, {useState, useEffect} from 'react'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');


const Chatbox = () => {
  const [allMessage, setAllMessage] = useState([]);
  useEffect(() => {
    socket.on('messageResponse', (data) => setAllMessage([...allMessage, data]));
  }, [socket, allMessage]);

  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('pseudo')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('pseudo'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <>
      { allMessage.map(message =>  (
          <p>{message.text}</p>
        )
      ) }
      <div className="chat__footer">
        <form className="form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendBtn">SEND</button>
        </form>
      </div>
    </>
    
  );
}

export default Chatbox;