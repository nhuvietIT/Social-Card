import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocalDetail, selectSocial, addSocalDetail, deleteocalDetail } from "./socialCardSlice";

import { Modal, Button, InputGroup, FormControl, Image } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "react-multiple-icons";

export function SocialCard() {
   const socialdData = useSelector(selectSocial);
   const dispatch = useDispatch();
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => {
      setName('')
      setDescription('')
      setShow(true);
   }
   const [Name, setName] = useState('');
   const [Description, setDescription] = useState('');
   const [dataUploadFile, setSaveUploadFile] = useState("");

   useEffect(() => {
      const fetchList = async () => {
         try {
            await dispatch(fetchSocalDetail())
         } catch (error) {
         }

      };
      fetchList();
   }, [dispatch]);
   const adddSocial = async () => {
      const data = {
         Name: Name,
         Description: Description,
         Upload: dataUploadFile
      }
      await dispatch(addSocalDetail(data))
      handleClose()
   }

   const ClickInputfile = (file) => {
      const formData = new FormData();
      formData.append("file", "avatar")
      formData.append("file", file, file.name)
      setSaveUploadFile(formData)
   }

   return (
      <div>
         {socialdData.status === 'loading' ?
            <div >Loading ...</div>
            :
            <div>
               <button className="btn btn-outline-info float-center btn-sl" style={{ width: '9rem', margin: 5 }}
                  onClick={handleShow}
               ><Icon iconName="fas fa-plus" /></button>
               <>
                  {socialdData.social.map((list) => (
                     <div key={list.id}>
                        <Card style={{ width: '25rem', margin: 6 }} border="dark" >
                           <Card.Img variant="top" src={"./uploads/avatar/" + list.Avatar} height={"352rem"} />
                           <Card.Body>
                              <Card.Title>{list.Name}</Card.Title>
                              <Card.Text>{list.Description}</Card.Text>
                              <div style={{ marginTop: 20 }} >
                                 <button className="btn btn-outline-danger btn-sm float-right"
                                    onClick={() => {
                                       dispatch(deleteocalDetail(list.id)) 
                                    }}
                                 ><Icon iconName="fas fa-trash" /></button>
                                 <button className="btn btn-outline-danger btn-sm float-left"><Icon iconName="fas fa-heart" /></button>
                                 <button className="btn btn-outline-primary btn-sm float-left" style={{ marginLeft: 9 }}
                                 ><Icon iconName="fas fa-comment-alt" /></button>
                              </div>
                           </Card.Body>
                        </Card>
                     </div>
                  ))}
               </>


               <Modal show={show} onHide={handleClose} size={"lg"} >

                  <Modal.Header closeButton style={{ background: "secondary" }}>
                     <Modal.Title className="modal_title">Add Social Card</Modal.Title>
                  </Modal.Header>

                  <Modal.Body>
                     <InputGroup className="mb-3">
                        <FormControl
                           placeholder="Name"
                           aria-label="Username"
                           aria-describedby="basic-addon1"
                           onChange={e => setName(e.target.value)} />
                     </InputGroup>

                     <InputGroup className="mb-3">
                        <FormControl
                           placeholder="Description"
                           aria-label="Username"
                           aria-describedby="basic-addon1"
                           onChange={e => setDescription(e.target.value)} />
                     </InputGroup>

                     <FormControl type="file" name="file" id="file"
                        // className={checkInputFile === "true" ? "inputfile" : ""}
                        // style={stype_colorInputfile}
                        // accept={type_Inputfile}
                        onChange={(e) => {
                           const file = e.target.files[0]
                           ClickInputfile(file)
                           // setcheckInputFile("false")
                        }} />

                  </Modal.Body>

                  <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                        Close
                     </Button>
                     <Button variant="info" onClick={adddSocial}>
                        Save
                     </Button>
                  </Modal.Footer>
               </Modal>
            </div>

         }
      </div>
      // <>
      //    <input
      //       type="text"
      //       name="name"
      //       onChange={(e) => { setName(e.target.value) }}
      //       placeholder="name..."
      //       autoComplete="off"
      //    />
      //    <input
      //       type="text"
      //       name="surname"
      //       onChange={(e) => { setDescription(e.target.value) }}
      //       placeholder="description"
      //       autoComplete="off"
      //    />
      //    <button onClick={(e) => { dispatch(showDataSocialCard(data)) }}>Add</button>
      //    <span >{count}</span>
      //    <hr />
      // </>

   )
}

// export default SocialCard