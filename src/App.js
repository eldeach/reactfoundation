import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter , Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, NavDropdown, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState} from 'react';
import axios from 'axios';

import LoginForm from './login/login';
import AccountMng from './login/AccountMng';
import AddAccount from './login/AddAccount';
import MyCanvas from './login/myCanvas'
import {setLoginStat, setUserInfo} from "./store.js"
import CreateAccount from './login/createAccount';
import cookies from 'react-cookies'




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
// console.log(cookies.load('userInfo'))




  return (
    <div className="App">
      <Navbar className="Navbar" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand onClick={()=>{navigate("/")}}>react foundation</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="계정관리" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>{navigate("/addaccount")}}>계정생성</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigate("/accountmng")}}>계정관리</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{navigate('/createaccount')}}>계정생성</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{navigate("/authmng")}}>권한부여</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>{navigate("/accountmng")}}>계정리스트</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigate("/authlist")}}>권한리스트</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="menu1" id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={()=>{navigate("/item1-1")}}>item1-1</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link onClick={async ()=>{navigate("/item2-1")}}>item2-1</Nav.Link>
          </Nav>
          <MyCanvas key={0} placement={"end"} name={cookies.load('loginStat') ? cookies.load('userInfo').user_name + "님": "로그인"}/>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<div>home</div>}/>
        <Route path='/addaccount' element={<AddAccount/>}/>
        <Route path='/accountmng' element={<AccountMng/>}/>
        <Route path='/createaccount' element={<CreateAccount/>}/>
        <Route path='/authmng' element={<div>authmng</div>}/>
        <Route path='/authlist' element={<div>authlist</div>}/>
        <Route path='/item1-1' element={ <div>item1-1</div> }/>
        <Route path='/item2-1' element={ <div>item2-1</div>}/>
        <Route path='/login' element={<LoginForm/>}/>
      </Routes>

    </div>
  );
}

export default App;