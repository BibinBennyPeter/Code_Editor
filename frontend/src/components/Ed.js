import React, { useState,useEffect } from 'react'
import Codemirror from 'codemirror'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/erlang-dark.css';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
//import 'codemirror/lib/java';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';


const Editor = () => {
 const [code, setCode] = useState("Hi");

 const txt=document.getElementById('liveCode');

 const out=document.getElementById('output');
 const codefromText =(e)=>{
    setCode(e.target.value)
  }
const getCode =()=>{
    out.innerHTML(code)
}
  useEffect(()=>{
    
    async function init() {
        Codemirror.fromTextArea(document.getElementById('liveCode'),{
        mode:"text/x-python",
        theme:'erlang-dark',
        autoCloseTags:true,
        autoCloseBrackets:true,
        lineNumbers:true,

      })
      }
      init();
    },[])
    return (
      <>
       <div className='panel'>
          <button id='run' onClick={getCode}>Run</button>
      </div>
         <div><textarea id='liveCode' onChange={codefromText}></textarea></div>
         <div id='preveiw'>
             <textarea id='output' /> 
          </div>
       </>
       );
}
export default Editor;