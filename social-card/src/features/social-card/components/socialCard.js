import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocalDetail, selectSocial, addSocalDetail, deleteocalDetail, updateSocalDetail } from "./socialCardSlice";

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
   const [idUpdate, setIdUpdate] = useState(Number);
   const [checkshow, setCheckshow] = useState(false);
   const [Search, setSearch] = useState("");

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

   const updateSocial = async () => {
      const data = {
         id: idUpdate,
         Name: Name,
         Description: Description,
         Upload: dataUploadFile
      }
      await dispatch(updateSocalDetail(data))
      handleClose()
   }

   let searchByFirstName = str => socialdData.social.filter(({ Name }) => Name.includes(str))
   const arrData = Search === "" ? socialdData.social : searchByFirstName(Search)
  
   return (
      <div>
         {socialdData.status === 'loading' ?
            <div >Loading ...</div>
            :
            <div>
               <InputGroup style={{ marginTop: 39, marginBottom: 21 }}>
                  <button className="btn btn-outline-info float-center btn-sl"
                     onClick={() => {
                        setCheckshow(false)
                        handleShow()
                     }}
                  ><Icon iconName="fas fa-plus" /></button>
                  <FormControl
                     aria-label="Userid"
                     aria-describedby="basic-addon1"
                     className="inputsearch"
                     placeholder="Search"
                     onChange={(e) => { setSearch(e.target.value) }}
                  />
               </InputGroup>
               <>
                  {arrData.map((list) => (
                     <div key={list.id}>
                        <Card style={{ width: '25rem', margin: 6 }} border="dark" >
                           <div>
                              <Card.Img variant="top" src={"./uploads/avatar/" + list.Avatar} height={"352rem"} />
                              <button className="btn btn-sl float-right" onClick={() => {
                                 setCheckshow(true)
                                 setIdUpdate(list.id)
                                 handleShow()
                              }}
                              ><Icon iconName="fas fa-pencil-alt" /></button>
                           </div>
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
                     {checkshow ? <>  <Modal.Title className="modal_title">Update Social Card</Modal.Title>
                     </> : <>
                        <Modal.Title className="modal_title">Add Social Card</Modal.Title></>
                     }

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
                     {checkshow ? <> <Button variant="info" onClick={updateSocial}>
                        Save
                     </Button>
                     </> : <>
                        <Button variant="info" onClick={adddSocial}>
                           Save
                        </Button></>
                     }

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