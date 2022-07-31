import React,{useState } from 'react';
//import './Chat.css';
import { socket } from '../pages/Home';
export const Chat = (props) => {


    const [messageHistory,setMessageHistory] = useState([]);
    const [msgHistLen,setMsgHistLen] = useState(-1);

    let roomId = props.id;
    let nm = props.n;
    const [cmsg,setCmsg] = useState({
        room: roomId,
        user: nm,
        message: ""
    })
    const [textMessage,setTextMessage] = useState("");
    // let textarea = document.getElementById('#textarea')
    let messageArea = document.getElementsByClassName('.message__area')

    const handle=(e) => {
        
        
        setTextMessage(e.target.value.trim());
        if(e.key === 'Enter') {
            sendChat(e.target.value)
            //console.log('hi')
        }
    }
    
    function sendChat(message) {
        let cmsg = {
            room: roomId,
            user: nm,
            message: message.trim()
        }
        setCmsg(cmsg)
        
        // Send to server 
        
        console.log("send",messageHistory.length);
        //Append 
        console.log(messageHistory)
        setMessageHistory([...messageHistory,
            <div key={cmsg.user+cmsg.message+cmsg.room+Math.random().toString()} className='outgoing  message'>
                <h4>{cmsg.user}</h4>
                <p>{cmsg.message}</p>
            </div>
            ]
        );
        socket.emit('chat', cmsg)
        setTextMessage('');
        scrollToBottom();

    }
    // function appendChat(cmsg, type) {
    //     let mainDiv = document.createElement('div')
    //     let className = type
    //     mainDiv.classList.add(className, 'message')

    //     let markup = ` 
    //         <h4>${cmsg.user}</h4>
    //         <p>${cmsg.message}</p>
    //     `
    //     mainDiv.innerHTML = markup
    //    // messageArea.createElement("div",{className:"mainDiv"},cmsg.message);
    //    messageArea.appendChild(mainDiv);
    // }
    function scrollToBottom() {
        messageArea.scrollTop = messageArea.scrollHeight
    }
    socket.on('chat', (cmsg) => { 
        if (messageHistory.length != msgHistLen){
            // console.log('ononononoonoon ---- ---- ononononno',messageHistory.length);       
            setMessageHistory([...messageHistory,
                <div key={cmsg.user+cmsg.message+cmsg.room+Math.random().toString()} className='incoming message'>
                    <h4>{cmsg.user}</h4>
                    <p>{cmsg.message}</p>
                </div>
                ]
            );
            setMsgHistLen(messageHistory.length);
            scrollToBottom()
            console.log(cmsg.user, cmsg.message);
        }
    })
  return (
    <>
        <div>
            <div className='chatApp'>
                <div className="chat__section">
                    <div className="brand">
                        {/* <img height="40" src="/wassup.png" alt=""/> */}
                        <h1 id='chatTitle'>Code Freinds</h1>
                    </div>
                    <div className="message__area">
                        {messageHistory.map((inp)=>inp)}
                    </div>
                    <div>
                        <textarea
                        id="chatcmsg" 
                        // cols="30" 
                        // rows="1" 
                        value={textMessage}
                        onChange={(e)=>{setTextMessage(e.target.value)}}
                        placeholder="Write a message..."
                        onKeyUp={handle}
                        
                        />
                            {/* {textMessage} */}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default Chat;