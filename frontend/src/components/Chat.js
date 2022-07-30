import React from 'react';
//import './Chat.css';
import { socket } from '../pages/Home';
export const Chat = (props) => {

    const roomId = props.id;
    //console.log(roomId);
    const proTitle = props.title;
    let textarea = document.getElementById('#textarea')
    let messageArea = document.getElementsByClassName('.message__area')

    const handle=(e) => {
        console.log(e.target.value)
        if(e.key === 'Enter') 
        {
            sendChat(e.target.value)
            //console.log('hi')
        }
    }
    
    function sendChat(message) {
        let cmsg = {
            room:roomId,
            user: proTitle,
            message: message.trim()
        }
        
        // Send to server 
        socket.emit('chat', cmsg)
        console.log("send")
        //Append 
        appendChat(cmsg, 'outgoing')
        textarea.value = ''
        scrollToBottom()

    }
    function appendChat(cmsg, type) {
        let mainDiv = document.createElement('div')
        let className = type
    //     mainDiv.classList.add(className, 'message')

    //     let markup = ` 
    //         <h4>${cmsg.user}</h4>
    //         <p>${cmsg.message}</p>
    //     `
    //     mainDiv.innerHTML = markup
    //    // messageArea.createElement("div",{className:"mainDiv"},cmsg.message);
    //    messageArea.Node.appendChild(mainDiv);
    }
    function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
    }
    socket.on('chat', (cmsg) => {
        appendChat(cmsg, 'incoming')
        scrollToBottom()
        console.log(cmsg.message);
    })

  return (
    <>
    <div>
        <div className='chatApp'>
            <div className="chat__section">
        <div className="brand">
            {/* <img height="40" src="/wassup.png" alt=""/> */}
            <h1 id='chatTitle'>{proTitle}</h1>
        </div>
        <div className="message__area"></div>
        <div>
            <textarea
             id="chatcmsg" 
             cols="30" 
             rows="1" 
             onChange={
                (e=>(e.target.value))} 
             placeholder="Write a message..."
             onKeyUp={handle}
             ></textarea>
        </div>
    </div>
    </div>
    </div>
</>
  );
}

export default Chat;