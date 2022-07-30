import { Routes, Route } from 'react-router-dom';
import {Toaster} from'react-hot-toast';
import './App.css';
import Home from './pages/Home';
import Code from './pages/Code';
import Login2 from './pages/Login2';
//import Login from './chatslides/Login';
//import Chats from './chatslides/Chats';
//import codeArea from './terminal/codeArea';
function App() {
  return (
    <>
    
       <Toaster
       position='bottom-center'
        toastOptions={{
          success:{
            theme:{
              primary:"green"
            }
          }
        }
        }
        ></Toaster>
        <Routes>
          <Route path='/' element={<Login2/>} exact></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/home/code/:roomId' element={<Code/>}></Route>
          {/* <Route path='/terminal' component={codeArea} /> */}
        </Routes>
    </>
    );
  }

export default App;
