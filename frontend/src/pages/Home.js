import toast from 'react-hot-toast';
import React, {useState} from 'react';
import {v4} from 'uuid';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import { useLocation } from "react-router-dom";
export const socket=io('http://localhost:8000/');

export const Home = () => {
    const navigate =useNavigate();
    const location = useLocation();
    let {tk} = location.state;
    // console.log(tk);
    const [roomId,setRoomId] = useState('');
    const [proTitle,setproTitle] = useState('');
    const createRoom= (e)=>{
        e.preventDefault();
        const id = v4();
        setRoomId(id);
        toast.success("Room created");
    }
    const joinRoom =()=>{
        if(!roomId && !proTitle){
            toast.error("ROOM ID and Project title is required");
            return;
        }
        else if(!proTitle){
            toast.error("Project title is required");
            return;
        }
        else if(!roomId){
            toast.error("ROOM ID is required");
            return;
        }
        
        //redirect
        socket.emit('message',roomId)
        socket.emit("chat",roomId)
        socket.emit('new',roomId)
        // socket.emit('message',proTitle)
        navigate(`/home/code/${roomId}`,{
            state:{
              proTitle,roomId,tk
            },
        }
        )
    };
    // socket.on('newconn',() => {
    //     // appendMessage(msg, 'incoming')
    //     sendMessage(Code.code) 
        
    // })

    // function sendMessage(code) {
    //     let msg = {
    //         room:roomId,
    //         user:proTitle,
    //         message: code.trim()
    //     }
         
    //     socket.emit('message', msg)  
    
    // }

    // socket.on('message', (msg) => {
    //     // appendMessage(msg, 'incoming')
    //     code= msg.message
        
    // })






    const handleInp= (e)=>{
        if(e.code ==='Enter'){
            joinRoom();  
        }
    }
  return (
    <>
    <div className='hpWrap'>
        <div className='formWrap'>
            <img className='logoHome' src="/logo192.png" alt='logo'/>
            <h4 className='tag'>Code Friends</h4>
            <div className='ipGroup'>
                <input
                    type='text'
                    className='ipBox'
                    placeholder='ROOM ID'
                    onChange={(e=>setRoomId(e.target.value))}
                    value={roomId}
                    onKeyUp={handleInp}
                />
                <input
                    type='text'
                    className='ipBox'
                    placeholder='PROJECT NAME'
                     onChange={(e=>setproTitle(e.target.value))}
                    value={proTitle}
                    onKeyUp={handleInp}
                />
                <button onClick={joinRoom} className='btn joinBtn'>Join</button>
                <span className='createInfo'>
                    Don't have a Room? &nbsp;<a onClick={createRoom} href="" className='createNewBtn'>Create new Room</a>
                </span></div>
            
            </div>
    </div></>
  )
};
export default Home;