import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { python } from '@codemirror/lang-python';
import React, { useState, useEffect } from 'react'
import { socket } from '../pages/Home';

export const Editor2 = (props) => {
    let roomId = props.id;
    let proTitle = props.title;
    //console.log(roomId)
    const [code, setCode] = useState("")
    //const [currentLang, setCurrentLang] = useState("python")
  //   useEffect(() => {
  //  // setCode(lan[currentLang].code)
  //   setCode(code)

  // },[])




  socket.on('newconn',() => {
    // appendMessage(msg, 'incoming')
    sendMessage(code) 
    
})

function sendMessage(c) {
    let msg = {
        room:roomId.trim(),
        user:proTitle,
        message: c.trim()
    }
     
    socket.emit('message', msg)  

}

socket.on('message', (msg) => {
    // appendMessage(msg, 'incoming')
    setCode(msg.message)
    //console.log("HI");
})


  //console.log(code)
  // const lan = {
  //   "python": {
  //     lang: python,
  //     code: "print('Hello World')"
  //   },
    // 'java': {
    //   lang: java,
    //   code: "console.log('Hello world');\nconsole.log('hii')"
    // }
  //}
  //console.log(currentLang)
  //console.log(code)
  
  //const props={setCurrentLang, currentLang, }
  return (
        <>
    <div className='panel'>
        {/* <select
         onChange={
        (e) => {
          setCurrentLang(e.target.value)
          //setCode(lan[e.target.value].code)
        }}><option value="python">Python</option>
            <option value="java">Java</option></select> */}
            <button onClick={setCode}>Run</button>
    </div>
    <div className='liveCode'>
          <CodeMirror
            className='CodeMirror'
            value={code}
            //language={currentLang}
            language='python'
            theme={[dracula]}
            spellCheck='true'
            //extensions={[lan[currentLang].lang()]}
            onChange={(ev) => {
              setCode(ev)
              sendMessage(code)
            }}
          />

        </div>
    </>
  )
}
export default Editor2;