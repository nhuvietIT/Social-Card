import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHeart, updateStatus, selectHeart } from './heartSlice'
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from "react-multiple-icons";
export function Heart(props) {
   const heartData = useSelector(selectHeart);
   const dispatch = useDispatch()


   useEffect(() => {
      const fetchList = async () => {
         try {
            await dispatch(fetchHeart())
         } catch (error) {
         }
      };
      fetchList();
   }, [dispatch]);

   return (
      <div >
         {heartData.status === 'loading' ?
            <div key={props.i}>
               {heartData.social.map((list, i) => (
                  <div key={i} >
                     {list.id === props.list.id ? <>
                        <button
                           style={{ border: "none" }}
                           className="btn btn-outline-danger btn-sm float-left"
                           onClick={() => {
                              const data = { id: list.id, Heart: list.Heart + 1 }
                              dispatch(updateStatus(data))
                           }}
                        ><Icon iconName="fas fa-heart" /></button>
                        <span className="btn-sm float-left" style={{ color: "red", fontWeight: "bold" }} >
                           {list.Heart}
                        </span>
                     </> : <></>}
                  </div>
               ))}
            </div>
            :
            <div key={props.i}>
               {heartData.social.map((list, i) => (
                  <div key={i} >
                     {list.id === props.list.id ? <>
                        <button
                           style={{ border: "none" }}
                           className="btn btn-outline-danger btn-sm float-left"
                           onClick={() => {
                              const data = { id: list.id, Heart: list.Heart + 1 }
                              dispatch(updateStatus(data))
                           }}
                        ><Icon iconName="fas fa-heart" /></button>

                        <span className="btn-sm float-left" style={{ color: "red", fontWeight: "bold" }} >
                           {list.Heart}
                        </span>
                     </> : <></>}
                  </div>
               ))}
            </div>
         }
      </div >
   )
}