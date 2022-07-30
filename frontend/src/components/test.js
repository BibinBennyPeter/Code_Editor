import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import Split from 'react-split'
import './CodeEditor.css'
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript'
import React, { useState, useEffect } from 'react'
//import DropDown from '../DropDown/DropDown';
//import CodeTitle from './CodeTitle';
//import codeDescription from './codeDescription'

function CodeEditor() {
  const [code, setCode] = useState("print('Hello World')")
  const [currentLang, setCurrentLang] = useState("python")
  const [currentTitle,setCurrentTitle]=useState('Description')

  
  useEffect(() => {
    setCode(lan[currentLang].code)

  },[currentLang])
  const lan = {
    "python": {
      lang: python,
      code: "print('Hello World')"
    },
    'javascript': {
      lang: javascript,
      code: "console.log('Hello world');\nconsole.log('hii')"
    }
  }
  console.log(currentLang)
  const props={setCurrentLang, currentLang, }
  return (
    <>
      <Split
        className='split-row h-screen '
        gutterAlign="center"
        gutterSize={15}
        direction="horizontal"
        minSize={400}
      >
        <div className="">
          <CodeTitle currentTitle={currentTitle} setCurrentTitle={setCurrentTitle}/>
         { codeDescription(currentTitle)}

        </div>
        <div>
          <DropDown {...props} />
          <CodeMirror
            value={code}
            height="500px"

            theme={[dracula]}
            extensions={[lan[currentLang].lang()]}
            onChange={(value) => {
              setCode(code)
            }}
          />

        </div>
      </Split>
      <button onClick={
        () => {
          setCurrentLang('javascript')
          setCode(lan['javascript'].code)
        }}>JavaScript</button>
    </>
  );
}
export default CodeEditor;