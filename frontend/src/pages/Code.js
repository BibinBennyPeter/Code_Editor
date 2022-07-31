import React from "react";
import Editor from "../components/Editor";
import Chat from "../components/Chat";
//import Error from "../components/Error";
import { useLocation } from "react-router-dom";
export const Code = () => {
  const location = useLocation();
  let { proTitle, roomId, tk } = location.state;
  //console.log(tk);

  return (
    <div className="codeWrap">
      <div className="editWrap">
        
          <Editor id={roomId} title={proTitle} t={tk}/>

      </div>
      <div className="chatWrap">
        <div>
        <Chat id={roomId} title={proTitle}/></div>
        {/* <div>
          <Error/>
        </div> */}
      </div>
    </div>
  );
};
export default Code;
