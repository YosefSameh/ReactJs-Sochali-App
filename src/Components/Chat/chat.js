import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import "./chat.css"
import {
MDBContainer,
MDBRow,
MDBCol,
MDBCard,
MDBCardHeader,
MDBCardBody,
MDBCardFooter,
MDBIcon,
MDBBtn,
MDBScrollbar
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux-Tollkit/users-tollkit';
import LoadingCircular from '../loading/loading-Circular';
import { Link } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [myValues, setMyValues] = useState([]);
  const [valueInput , setValueInput] = useState("")
  const firstName = localStorage.getItem("firstName")
  const idUser = localStorage.getItem("id")
  const dispatch = useDispatch()
  const { users,loading,error } = useSelector(state => state.users);
  useEffect(() => {
  
const newSocket = io("https://node-js-sochali-app.vercel.app", {
    withCredentials: true
});
    setSocket(newSocket);
    dispatch(fetchUsers())
  
    newSocket.on('initial messages', (msgs) => {

      setMessages(msgs); 
    });
  
    newSocket.on('chat message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });
  
    newSocket.on("ShowTyping", () => {
      setIsTyping(true);
    });
  
    newSocket.on("StopTyping", () => {
        setTimeout(() => {
            setIsTyping(false);
        }, 1800);
    });

    return () => {
      newSocket.off('chat message');
      newSocket.off("ShowTyping");
      newSocket.off("StopTyping");
      newSocket.disconnect();
    };
  }, []);
  
  const user = users.find(user => user._id === idUser);
  const userImage = user && user.imgProfile ? user.imgProfile : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
        const message = { sender: firstName,imgProfile:userImage, content: inputValue }; // Replace `username` with the actual username
        socket.emit('chat message', message);
        setInputValue('');
        setMyValues(prevValues => [...prevValues, inputValue]);
        setValueInput(inputValue);
    }
};


  const handleTyping = () => {
    socket.emit("typing");
  };

  const handleStopTyping = () => {
    socket.emit("stop-typing");
  };


  return (
<div>
<MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
    {loading && <div><LoadingCircular/></div>}
    {!users ? <div>Users Not Found Pleacs ReFrech Page</div> : null}
  <MDBRow className="d-flex justify-content-center">
          <MDBCol md="10" lg="8" xl="6">
            <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
              <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                <h5 className="mb-0">Chat</h5>
              </MDBCardHeader>
  <MDBCardBody style={{ maxHeight: "340px", overflowY: "auto" }}>
{messages.map((msg, index) => (
 
    msg.sender === firstName ? 
    <div key={index} className="d-flex mb-3 flex-row justify-content-start">
    <img
      src={userImage}
      alt="avatar 1"
      style={{ width: "40px", height: "100%", borderRadius:"50%" }}
      />
    <div >
      <p
        className="small p-2 ms-3 mb-1 rounded-3"
        style={{ backgroundColor: "#f5f6f7" }}
      >
        {msg.content}
      </p>
    
    </div>
  </div>
      : 
      <div key={index} className="d-flex flex-row justify-content-end mb-3 pt-1">
        <div>
          <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
            {msg.content}
          </p>
        </div>
        <img
          src={msg.imgProfile}
          alt="avatar 1"
          style={{ width: "40px", height: "100%" ,borderRadius:"50%" }}
        />
        {console.log(msg.imgProfile,"imgProfile ")
        }
      </div>
      
  ))}
  </MDBCardBody>
  <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                <img
                  src={userImage}
                  alt="avatar 3"
                  style={{ width: "40px", height: "100%",borderRadius:"50%" }}
                />
                
               <form  onSubmit={handleSubmit} className="form-control form-control-lg">
               <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  placeholder="Type message"
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleTyping}
                  onKeyUp={handleStopTyping}
                ></input>
               </form>
                  <MDBIcon fas icon="paperclip"className="ms-1 text-muted" />

                  <MDBIcon fas icon="smile" className="ms-3 text-muted"/>
                
                <Link >
                  <MDBIcon className="ms-3" onClick={handleSubmit} fas icon="paper-plane" />
                </Link>
              </MDBCardFooter>
      
      </MDBCard>
          </MDBCol>
        </MDBRow>    
      </MDBContainer> 
    </div>
  );
  };
//     <div>
//       <ul id="messages">
//   {messages.map((msg, index) => (
//     msg.sender === firstName ? 
//       <li className='bg-black' key={index}> 
//         {msg.content}
//       </li> 
//       : 
//       <li key={index}>
//         {msg.content}
//       </li>
//   ))}
// </ul>
//       {isTyping && <span id="span-typing">userTyping</span>}
//       <form id="form" onSubmit={handleSubmit}>
//         <input 
//           id="input" 
//           autoComplete="off" 
//           value={inputValue} 
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={handleTyping}
//           onKeyUp={handleStopTyping}
//           />
//         <button type="submit">Send</button>
//       </form>
//     </div>

export default Chat;
