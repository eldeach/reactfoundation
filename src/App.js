import './App.css';
import LoginForm from './login/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar, Container, NavDropdown, Nav} from 'react-bootstrap';


import { useDispatch, useSelector } from "react-redux"
import MyCanvas from './login/myCanvas'


function App() {
  let rdx= useSelector((state)=>{return state});

  let dispatch = useDispatch()
  let navigate = useNavigate()

  return (
    <div className="App">
      <Navbar className="Navbar" bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand onClick={()=>{navigate("/")}}>react foundation</Navbar.Brand>
          <Nav className="me-auto">
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
        <Route path='/' element={
          rdx.loginUser.loginStat ? <div>home</div> : <LoginForm/>
        }/>
        <Route path='/item1-1' element={ <div>item1-1</div> }/>
        <Route path='/item2-1' element={ <div>item2-1</div> }/>
        <Route path='/login' element={<LoginForm/>}/>
      </Routes>
      
    </div>
  );
}

export default App;