
import './App.css';
import FormVideo from './form'; 
import {Button} from "react-bootstrap"
import { useState } from 'react';

function App() {
  const[show,setShow]=useState(false)

  const showForm=()=>{
    setShow(true)
  }

  return (
    <>
    <div className="container">
    <h1 className="header">Convert .MP4 to HLS .M3U8 </h1>
    {(!show)?<Button className="new" variant="success" onClick={showForm}>Create NEW Project</Button>:null}
    <div className="form">
    {(show)?<FormVideo/>:null}
    </div>
    </div>
    </>
  );
}

export default App;
