import axios from "axios";
import { saveAs } from 'file-saver';
import { useState } from "react";
import {Form ,Button,ProgressBar} from "react-bootstrap"
import "./form.css"
function FormVideo()
{
    const [selectedFile, setSelectedFile] = useState();
    const [error,setError]=useState()
    const [progress,setProgress]=useState(false)

    function Progress()
    { 
        console.log(progress)
        return(
            <>
            <p className="alert">Converting Video:Please wait,it may take a while </p>
            <p className="alert p2" >Tip:Extract Zip and Play </p>
            <ProgressBar animated now={45} />
            </>
        )
    }


const sendFile=async()=>{
    setProgress(true)
    console.log(progress)
  let formData = new FormData();
  formData.append("file", selectedFile);

  axios.post("https://videoconverter-mp4tom3u8.herokuapp.com/convert",formData,{
    responseType:"arraybuffer"
  }).then((response)=>{
    const blob = new Blob([response.data], {
      type: 'application/octet-stream'
    })
    console.log(blob)
    const filename = 'download.zip'
    setProgress(false)
    saveAs(blob, filename)
  })
  .catch((err)=>{
    setProgress(false)
    setError("Error converting Video")
    console.log(err)
  })
 
}

  const handleChange=(event)=>{
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
  }

  const handleSubmit=(event)=>{
    event.preventDefault() 
    console.log(selectedFile)
    if(selectedFile)
    {
     if(selectedFile.type === "video/mp4" ){ 
         setError(); 
         sendFile() 
        }
        else{
            setError("invalid File Format")
        }
    }
    else{
        setError("Please select File")
    }
  }
return(
    <>
     <Form onSubmit={handleSubmit}>
     <h3>Select File to Upload</h3>
    <Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Choose .mp4 file</Form.Label><br/>
    <Form.Control type="file" onChange={handleChange} />
    </Form.Group>
    <p className="error">{error}</p>
    <Button className="convert" variant="dark"  type="submit">
    Convert
    </Button>
   
    {(progress)?<Progress/> :null}
    </Form>
    </>
)
}
export default FormVideo