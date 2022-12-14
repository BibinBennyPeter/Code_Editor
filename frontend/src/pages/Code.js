import React from "react";
import Editor from "../components/Editor";
import Chat from "../components/Chat";
import Error from "../components/Youtube/Error";
import { useLocation } from "react-router-dom";
export const Code = () => {
  const location = useLocation();
  let { roomId, nm, tk } = location.state;
  //console.log(tk);

  return (
    <div className="codeWrap">
      <div className="editWrap">
        
          <Editor id={roomId} t={tk}/>

      </div>
      <div className="chatWrap">
        <div>
        <Chat id={roomId} n={nm}/></div>
        <div>
          <Error/>
        </div>
      </div>
    </div>
  );
};
export default Code;
