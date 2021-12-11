import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
   fetchSocalDetail, selectSocial, addSocalDetail, deleteocalDetail, updateSocalDetail, revertUndo
} from "./socialCardSlice";
import { selectCommnet } from "../components/comment/commentSlice"

import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "react-multiple-icons";
import { Comment } from './comment/comment'
import { Heart } from '../components/heart/heart';
import { Avatar } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import '../../social-card/stypeSocial.css'


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
   const [dataUploadFileIMG, setSaveUploadFileIMG] = useState("");
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
         Upload: dataUploadFile,
         Image: dataUploadFileIMG,
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
   const ClickInputfileIMG = (file) => {
      const formData = new FormData();
      formData.append("file", "img")
      formData.append("file", file, file.name)
      setSaveUploadFileIMG(formData)
   }


   const updateSocial = async () => {
      const data = {
         id: idUpdate,
         Name: Name,
         Description: Description,
         Upload: dataUploadFile,
         Image: dataUploadFileIMG,
      }
      console.log(data)
      await dispatch(updateSocalDetail(data))
      handleClose()
   }

   let searchByFirstName = str => socialdData.social.filter(({ Name }) => Name.includes(str))
   const arrData = Search === "" ? socialdData.social : searchByFirstName(Search)
   const dataList = arrData.map(({ id, Name, Avatar, Description, Image, Heart, IsEnable }) =>
      ({ id: id, Name: Name, Avatar: Avatar, Description: Description, Image: Image, Heart: Heart, IsEnable: IsEnable }))
   dataList.sort((a, b) => { return b.id - a.id });

   const dataListcomment = commentldData.social.map(({ id, Content, socialCardId }) => ({ id: id, Content: Content, socialCardId: socialCardId }))
   const stype_text = { background: "#FFFFFF", color: "#181407", fontWeight: "bold", border: "none" }

   const options = [
      { idmenu: 1, icon: 'fas fa-pencil-alt', name: ' Update', className: 'btn-sm btn-outline-primary' },
      { idmenu: 2, icon: 'fas fa-trash', name: ' Delete', className: 'btn-sm btn-outline-danger' },
   ];
   const ITEM_HEIGHT = 48;
   const [anchorEl, setAnchorEl] = useState(null);
   const opens = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleCloses = () => {
      setAnchorEl(null);
   };


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
                  <button className="btn btn-warning float-center btn-sl" style={{ color: "white", fontWeight: "bold" }}
                     onClick={() => {
                        dispatch(revertUndo(idSocial))
                     }}
                  > Revert</button>
               </InputGroup>
               <>
                  {dataList.map((list, i) => (
                     <div key={i}>
                        <Card style={{ width: '39rem', margin: 6 }}   >
                           <div style={{ backgroundColor: "#DF7401", }}>
                              <CardHeader className='MuiCardHeader-title '
                                 avatar={
                                    <Avatar alt="Cindy Baker" sx={{ width: 48, height: 48 }} src={"./uploads/avatar/" + list.Avatar} />
                                 }
                                 action={
                                    <div>
                                       <IconButton
                                          aria-label="more"
                                          id="long-button"
                                          aria-controls="long-menu"
                                          aria-expanded={opens ? 'true' : undefined}
                                          aria-haspopup="true"
                                          onClick={(event) => {
                                             handleClick(event)
                                             setIdSocial(list.id)
                                             setIdUpdate(list.id)
                                             setName(list.Name)
                                             setDescription(list.Description)
                                          }}
                                       >
                                          <MoreVertIcon sx={{ color: "white" }} />
                                       </IconButton>

                                       <Menu
                                          id="long-menu"
                                          MenuListProps={{
                                             'aria-labelledby': 'long-button',
                                          }}
                                          anchorEl={anchorEl}
                                          open={opens}
                                          onClose={handleCloses}
                                          PaperProps={{
                                             style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '15ch',
                                             },
                                          }}
                                       >
                                          <MenuItem onClick={() => {
                                             setCheckshow(true)
                                             handleShow()
                                             setIdUpdate(idSocial)
                                             setName(Name)
                                             setDescription(Description)
                                             handleCloses()
                                          }}>
                                             <IconButton style={{ color: "#424242", fontSize: 18 }} >
                                                <Icon className={options[0].className} iconName={options[0].icon} />{options[0].name}
                                             </IconButton>
                                          </MenuItem>

                                          <MenuItem onClick={() => {
                                             if (window.confirm("Data can't revert! Do you want to continue?" + idSocial)) {
                                                dispatch(deleteocalDetail(idSocial))
                                             }
                                             handleCloses()
                                          }}>
                                             <IconButton style={{ color: "#424242", fontSize: 18 }} >
                                                <Icon className={options[1].className} iconName={options[1].icon} />{options[1].name}
                                             </IconButton>
                                          </MenuItem>

                                       </Menu>
                                    </div>
                                 }
                                 title={list.Name}
                              />

                           </div>
                           <CardContent className='MuiCardContent-root'>
                              <Typography variant="subtitle2" color="text.secondary" align="left">
                                 {list.Description}
                              </Typography>
                           </CardContent>
                           <CardMedia
                              component="img"
                              image={"./uploads/img/" + list.Image}
                              alt="Paella dish"
                           />
                           <Card.Body>
                              <div style={{ marginTop: 20 }} >

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
                     <InputGroup className="mb-3">
                        <span className="input-group-text" style={stype_text}
                           id="inputGroup-sizing-sm">Avatar</span>
                        <FormControl type="file" name="file" id="file" style={{ marginLeft: 9 }}
                           onChange={(e) => {
                              const file = e.target.files[0]
                              ClickInputfile(file)
                           }} />
                     </InputGroup>
                     <InputGroup className="mb-3">
                        <span className="input-group-text" style={stype_text}
                           id="inputGroup-sizing-sm">Image</span>
                        <FormControl type="file" name="file" id="file" style={{ marginLeft: 9 }}
                           onChange={(e) => {
                              const file = e.target.files[0]
                              ClickInputfileIMG(file)
                           }} />
                     </InputGroup>
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
            </div >

         }
      </div >
   )
}