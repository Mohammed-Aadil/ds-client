import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, FormGroup, Input } from "reactstrap";
import { toast } from 'react-toastify';
import API from "api";


export const DownloadModal = (props) => {
  const [modal, setModal] = React.useState();
  const toggle = () => setModal(!modal);
  let [docId, setDocId] = React.useState('')
  let downloadDocument = (id) => {
    return new API().download(`/storage/${id}/download`)
    .then((data) => {
      toast.info(`File will be downloaded shortly please do not refresh.`);
      console.log(data)
      toggle()
      return Promise.resolve(null)
    })
  }
  React.useEffect(() => {
    setDocId(props.groupID || localStorage.getItem('groupID'))
  }, [props.groupID])
  return (
    <>
      <Button outline color="success" onClick={toggle}>Download Document</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Download Document</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Please enter document id</Label>
            <Input type="text" name="docID" value={docId || ''} onChange={(e) => setDocId(e.target.value)} placeholder="Document ID"></Input>
          </FormGroup>          
        </ModalBody>
        <ModalFooter>          
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="primary" onClick={() => downloadDocument(docId)}>Download</Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  )
}
