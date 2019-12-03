import React from 'react';
import { Container, Row, CustomInput, FormGroup, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { DownloadModal } from "./component/download.modal";
import ProjectInfo from "./component/proj-info";
import { ToastContainer, toast } from 'react-toastify';
import API from "api";


function UploadDocument(files: any) {
  if (files && files.length > 0) {
    let form = new FormData()
    form.append('file', files[0])
    return new API().post('/storage', form)
    .then((response) => response.json())
    .then((data) => {
      toast.info(`Your file is uploaded. Wait for 2 mins to generate all documents images.`);
      localStorage.setItem('groupID', data['groupID'])
      return Promise.resolve(true)
    })
  }
  return Promise.resolve(false)
}

function App() {
  let [file, setFile] = React.useState()
  let [groupID, setGroupID] = React.useState(localStorage.getItem('groupID'))
  let uploadFile = (file) => {
    UploadDocument(file)
      .then((uploaded:boolean) => {
        if (uploaded) {
          setGroupID(localStorage.getItem('groupID'))
        }
      })
  }
  let reset = () => {
    localStorage.clear()
    setGroupID(localStorage.getItem('groupID'))
  }
  return (
    <Container>
      <Row>
        <div className="center-item">
            <h1>Doc to Image</h1>
            <FormGroup>
              <CustomInput type="file" id="exampleCustomFileBrowser" name="file" onChange={(e) => setFile(e.target.files)} label="Select a file (docx, pdf and txt are supported.)" />
            </FormGroup>
            <FormGroup> 
              <Button outline color="primary" onClick={(e) => uploadFile(file)}>Upload Document</Button>{' '}
              <DownloadModal groupID={groupID}></DownloadModal>{' '}
              <Button  color="warning" onClick={(e) => reset()}>Reset</Button>
            </FormGroup>
            <ToastContainer
              position="top-right"
              autoClose={50000}
              hideProgressBar
              newestOnTop={false}
              rtl={false}
              pauseOnHover
            />
        </div>
      </Row>
      <Row>
        <div>
          <ProjectInfo groupID={groupID}></ProjectInfo>
        </div>
      </Row>
    </Container>
  );
}

export default App;
