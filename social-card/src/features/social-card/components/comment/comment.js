import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComment, addComment, selectCommnet } from "./commentSlice";

import { Modal, Button, InputGroup, FormControl, Image, Collapse } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "react-multiple-icons";

export function Comment(props) {
   const commentldData = useSelector(selectCommnet);
   const dispatch = useDispatch();
   const [comment, setComent] = useState('');
   const [open, setOpen] = useState(false);
   useEffect(() => {
      const fetchList = async () => {
         try {
            await dispatch(fetchComment())
         } catch (error) {
         }
      };
      fetchList();
   }, [dispatch]);

   const AddComment = async () => {
      if (comment !== "") {
         const data = { socialCardId: props.idSocial, Content: comment }
         await dispatch(addComment(data))
         setComent('')
      }
   }

   const dataList = commentldData.social.map(({ id, Content, socialCardId }) => ({ id: id, Content: Content, socialCardId: socialCardId }))
   dataList.sort((a, b) => { return b.id - a.id });
   const dataComentList = dataList.filter(f => f.socialCardId === props.idSocial)


   return (
      <div>
         {commentldData.status === 'loading' ?
            <div >Loading ...</div>
            :
            <div> 
               <Collapse in={props.open ? true : open} key={props.idSocial}>
                  <div id={props.idopen}>
                     <div >
                        {dataComentList.map((list) => (
                           <FormControl key={list.id}
                              placeholder="Comment..."
                              aria-label="Username"
                              value={list.Content}
                              aria-describedby="basic-addon1"
                              className="float-left"
                              readOnly
                              style={{ backgroundColor: "#ffffff", marginBottom: 2 }}
                           />
                        ))
                        }
                        <InputGroup>
                           <FormControl
                              placeholder="Comment..."
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              className="float-left"
                              onBlur={(e) => { setComent(e.target.value) }}
                              defaultValue={""}
                           />
                           <button className="btn btn-outline-primary btn-sm float-left"
                              onClick={() => {
                                 AddComment()
                                 setOpen(open)
                              }}>
                              <Icon iconName="fas fa-chevron-circle-right" /></button>
                        </InputGroup>

                     </div>

                  </div>
               </Collapse>

            </div>
         }
      </div >
   )
}