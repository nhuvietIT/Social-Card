import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStatus } from "./socialCardSlice";
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "react-multiple-icons";

export function Heart(props) {
   const dispatch = useDispatch()
   // const dataList = props.socialdData.social.map(({ id, Name, Avatar, Description, Image, Heart, IsEnable }) =>
   //    ({ id: id, Name: Name, Avatar: Avatar, Description: Description, Image: Image, Heart: Heart, IsEnable: IsEnable }))
   // dataList.sort((a, b) => { return b.id - a.id });

   console.log(dataList)
   return (
      <div>
         {props.socialdData.status === 'loading' ?
            <div >Loading ...</div>
            :
            <div>
               {props.socialdData.social.map((list, i) => (
                  <div key={i}>
                     <button
                        style={{ border: "none" }}
                        className="btn btn-outline-danger btn-sm float-left"
                        onClick={() => {
                           // const data = { id: list.id, Heart: list.Heart + 1 }
                           // dispatch(updateStatus(data))
                        }}
                     ><Icon iconName="fas fa-heart" /></button>
                     <span className="btn-sm float-left" style={{ color: "red", fontWeight: "bold" }} >
                        {list.Heart}
                     </span>

                  </div>
               ))}
            </div>
         }
      </div >
   )
}