import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, NavDropdown, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState} from 'react';
import axios from 'axios';

import LoginForm from './login/login';
import MyCanvas from './login/myCanvas'
import {setLoginStat, setUserInfo} from "./store.js"
import CreateAccount from './login/createAccount';


function App() {
  let rdx= useSelector((state)=>{return state});

  let navigate = useNavigate()
  // const location = useLocation();
  // let [loginStat,setLoginStat] = useState(false);
  // let dispatch = useDispatch()

  // useEffect(() => {
    // axios.get("/logincheck").then((res)=>{
    //   console.log(res.data.loginStat)
    //   res.data.loginStat  ? setLoginStat(true) : setLoginStat(false)
    // }).catch((err)=>console.log(err))

    // if(!loginStat){
    //   localStorage.removeItem('persist:root')
    //   sessionStorage.removeItem('persist:root')
    //   axios.get("/logout").then((res)=>{}).catch((err)=>console.log(err))
    //   navigate("/login")
    //   dispatch(setLoginStat(false))
    //   dispatch(setUserInfo({user_account : '', user_name : '로그인이 필요합니다.', user_auth : ["nothing"]}))
    // }

// }, [location]);

  return (
    <div className="App">
      <Navbar className="Navbar" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand onClick={()=>{navigate("/")}}>react foundation</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="계정관리" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>{
                if (rdx.loginUser.userInfo.user_auth.indexOf("CREATEACCOUNT",0)!=-1){
                  navigate("/createaccount")
                }
                else{
                  alert("권한이 없습니다.")
                }
                }}>계정생성</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{
                if (rdx.loginUser.userInfo.user_auth.indexOf("AUTHMNG",0)!=-1){
                  navigate("/authmng")
                }
                else{
                  alert("권한이 없습니다.")
                }
                }}>권한부여</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{
                if (rdx.loginUser.userInfo.user_auth.indexOf("ACCOUNTVIEW",0)!=-1){
                  navigate("/accountview")
                }
                else{
                  alert("권한이 없습니다.")
                }
                }}>계정리스트</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                if (rdx.loginUser.userInfo.user_auth.indexOf("AUTHLIST",0)!=-1){
                  navigate("/authlist")
                }
                else{
                  alert("권한이 없습니다.")
                }
                }}>권한리스트</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="menu1" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>{
                if (rdx.loginUser.userInfo.user_auth.indexOf("item1-1",0)!=-1){
                  navigate("/item1-1")
                }
                else{
                  alert("권한이 없습니다.")
                }
                }}>item1-1</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link onClick={()=>{navigate("/item2-1")}}>item2-1</Nav.Link>
          </Nav>
          <MyCanvas key={0} placement={"end"} name={rdx.loginUser.loginStat ? rdx.loginUser.userInfo.user_name + "님" : "로그인"}/>
        </Container>
      </Navbar>


      <Routes>
        <Route path='/' element={<div>home</div>}/>
        <Route path='/createaccount' element={<CreateAccount/>}/>
        <Route path='/authmng' element={<div>authmng</div>}/>
        <Route path='/accountview' element={<div>accountview</div>}/>
        <Route path='/authlist' element={<div>authlist</div>}/>
        <Route path='/item1-1' element={ <div>item1-1</div> }/>
        <Route path='/item2-1' element={ <div>item2-1</div> }/>
        <Route path='/login' element={<LoginForm/>}/>
      </Routes>
      
    </div>
  );
}

export default App;