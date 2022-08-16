import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup'
import axios from 'axios';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux"
import {setLoginStat, setUserInfo, setLogOut} from './../store'
import cookies from 'react-cookies'




function MyCanvas({ name, ...props }) {
  let rdx= useSelector((state)=>{return state});
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" size='sm' onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Button variant="primary" size='sm' onClick={()=>{
              cookies.remove('loginStat', {path :'/',})
              cookies.remove('userInfo', {path :'/',})
              axios.get("/logout").then((res)=>{}).catch((err)=>console.log(err))
              navigate("/login")
              handleClose()
              }}>{cookies.load('loginStat') ? cookies.load('userInfo').user_name + "님 | 로그아웃" : "로그인 해주세요"}</Button>
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {
               cookies.load('userInfo')?cookies.load('userInfo').user_auth.map((oneAuth,i)=>{
                return <ListGroup.Item size='sm'>권한 {i+1} : {oneAuth}</ListGroup.Item>
              }):"N/A"
            }
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default MyCanvas