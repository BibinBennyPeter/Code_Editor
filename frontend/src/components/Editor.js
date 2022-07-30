import React, {useState, useEffect, useRef } from 'react'
import Codemirror from 'codemirror'
import axios from 'axios'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/mode/python/python';
//import 'codemirror/mode/clike/clike';
//import 'codemirror/lib/java';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

import { socket } from '../pages/Home';
const Editor = (props) => {
  const [Result, setResult] = useState('');
  const [inp, setInp] = useState('');
  const editor=useRef(null)
  const roomId = props.id;
  const proTitle = props.title;
  
  async function runFunc(){
      const code  =editor.current.getValue();
      //const in=document.getElementById('in')
      //const stdin = in.getValue();
      const stdin=inp;
      console.log(JSON.stringify({code}))
      const result = await fetch('http://localhost:8000/home/code', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({code,stdin})
                      })
                  .then((res) => res.json())
                  .catch(err => { console.log("error:" + err) });

      setResult(result.output);
  };

  function sendMessage(c) {
      let msg = {
          room:roomId.trim(),
          user:proTitle,
          message: c.trim()
      };
      socket.emit('message', msg)  
  };

  useEffect(()=>{    
      async function init() {
        editor.current=Codemirror.fromTextArea(
          document.getElementById('liveCode') , 
          {
            mode: "text/x-python",
            theme:'erlang-dark',
            autoCloseTags:true,
            autoCloseBrackets:true,
            lineNumbers:true,
          }
        );

        editor.current.on('change',(instance,changes) => {
          //console.log('changes',changes);
          const {origin}=changes;
          const code = instance.getValue();
          //console.log(code);
          if(origin!=='setValue'){
            sendMessage(code);
          }
        });

        editor.current.setValue('print("hello world")');
        console.log(editor.current.mode);

        socket.on('message', (msg) => {
          console.log(msg.message);  
          if(msg.message !==null)
          {
             editor.current.setValue(msg.message);
             //console.log(msg.message);    
          }
        })
      };
      init();
    },[])

    console.log(Result);
    return (
      <>
      <div className="topTerminal">
       <div className='panel'>
            {/* <label>Language:</label>
            <select className='dropList'
              value={language}
              onChange={(e) => {
                  setLanguage(e.target.value);
              }}
            >
              <option ></option>
              <option value="text/x-csrc">C</option>
              <option value="text/x-c++src">C++</option>
              <option value="text/x-python">Python</option>
              <option value="text/x-java">Java</option>
            </select> */}
            <button onClick={runFunc} className='runBtn'>Run</button>
        </div>
        
         <div className='textArea' style={{height:'456px'}}><textarea id='liveCode'/></div>
         </div>
        <div id='lowerTerminal'>

          <div className='llbox'>
            <label id='ipT'>Input</label>
          <textarea
                className='in'
                sandbox='allow-scripts'
                frameBorder='0'
                width='100%'
                height='100%'
                value={inp}
                onChange={(e)=>{
                setInp(e.target.value)
                }
              }
            /></div>
            <div className='lrbox'> 
            <label id='ioT'>Ouput</label>
              <textarea  
                readOnly
                className='out'
                sandbox='allow-scripts'
                frameBorder='0'
                width='100%'
                height='100%'
                value={Result}
                onChange={(e)=>{
                  setResult(e.target.value)
                }}
            /> </div>
            </div>
       </>
       );
}
export default Editor;