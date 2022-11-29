import './App.css';
import Routes from "./router/Router";
import "./style/main.css";
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (

    <Routes socket={socket} />
  );
}

export default App;
