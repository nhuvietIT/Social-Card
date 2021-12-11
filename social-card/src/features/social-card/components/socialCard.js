import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   fetchSocalDetail, selectSocial, addSocalDetail, deleteocalDetail, updateSocalDetail,
} from "./socialCardSlice";
import { selectCommnet } from "../components/comment/commentSlice"

import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "react-multiple-icons";
import { Comment } from './comment/comment'
import { Heart } from '../components/heart/heart';

export function SocialCard() {
   const socialdData = useSelector(selectSocial);
   const commentldData = useSelector(selectCommnet);
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
   const [idSocial, setIdSocial] = useState(Number);
   const [open, setOpen] = useState(false)

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
   const dataList = arrData.map(({ id, Name, Avatar, Description, Image, Heart, IsEnable }) =>
      ({ id: id, Name: Name, Avatar: Avatar, Description: Description, Image: Image, Heart: Heart, IsEnable: IsEnable }))
   dataList.sort((a, b) => { return b.id - a.id });

   const dataListcomment = commentldData.social.map(({ id, Content, socialCardId }) => ({ id: id, Content: Content, socialCardId: socialCardId }))

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
                  {dataList.map((list, i) => (
                     <div key={i}>
                        <Card style={{ width: '25rem', margin: 6 }} border="dark" >
                           <div>
                              <Card.Img variant="top" src={"./uploads/avatar/" + list.Avatar} height={"352rem"} />
                              <button className="btn btn-sl float-right" onClick={() => {
                                 setCheckshow(true)
                                 handleShow()
                                 setIdUpdate(list.id)
                                 setName(list.Name)
                                 setDescription(list.Description)

                              }}
                              ><Icon iconName="fas fa-pencil-alt" /></button>
                           </div>
                           <Card.Body>
                              <Card.Title>{list.Name}</Card.Title>
                              <Card.Text>{list.Description}</Card.Text>
                              <div style={{ marginTop: 20 }} >
                                 <button className="btn btn-outline-danger btn-sm float-right" style={{ border: "none" }}
                                    onClick={() => {
                                       if (window.confirm("Data can't revert! Do you want to continue?")) {
                                          dispatch(deleteocalDetail(list.id))
                                       }
                                    }}
                                 ><Icon iconName="fas fa-trash" /></button>

                                 <Heart list={list} i={i} />

                                 <button className="btn btn-outline-primary btn-sm float-left"
                                    style={{ border: "none", marginLeft: 9 }}
                                    onClick={() => {
                                       setOpen(!open)
                                       setIdSocial(list.id)
                                    }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                 > <Icon iconName="fas fa-comment-alt" /> </button>
                                 <span className="btn-sm float-left"
                                    style={{ color: "#0040FF", fontWeight: "bold" }}>{dataListcomment.filter(f => f.socialCardId === list.id).length}</span>

                              </div>
                           </Card.Body>

                           <Comment open={list.id === idSocial ? open : false} idopen={"example-collapse-text"} idSocial={idSocial} />

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
                           value={Name}
                           aria-describedby="basic-addon1"
                           onChange={e => setName(e.target.value)} />
                     </InputGroup>

                     <InputGroup className="mb-3">
                        <FormControl
                           placeholder="Description"
                           aria-label="Username"
                           value={Description}
                           style={{ height: 100 }}
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
   )
}