import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSocalDetail, selectSocial } from "./socialCardSlice";

import { Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

export function AddSocialCard() {

   const socialdData = useSelector(selectSocial);
   const dispatch = useDispatch();
   const [name, setName] = useState()
   const [description, setDescription] = useState()
   const [dataSocialCard, setDataSocialCard] = useState([])

   const data = {
      Name: name,
      Description: description
   }
   useEffect(() => {
      const fetchList = async () => {
         try {
            await dispatch(fetchSocalDetail())
         } catch (error) {
         }

      };
      fetchList();
   }, [dispatch]);

   return (
      <div>
        
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