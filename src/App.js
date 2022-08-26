import './App.css';
//========================================================== React 라이브러리 import
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

//========================================================== Material UI 라이브러리 import
import {AppBar, Divider, Box, Toolbar, Typography, Button, IconButton, Drawer, ListItemButton, ListItemIcon, ListItemText, ListItem, List} from '@mui/material/';
//----------------------------------------------------------- Material UI 라이브러리 (Icon) import
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
//========================================================== axios 라이브러리 import
import axios from 'axios';
//========================================================== cookie 라이브러리 import
import cookies from 'react-cookies'
//========================================================== 라우트할 import
import UserLogin from './Account/UserLogin';
import MngAccount from './Account/MngAccount';
import AddAccount from './Account/AddAccount';
import EditAccount from './Account/EditAccount';
import EditUserAuth from './Auth/EditUserAuth';






function App() {
  //========================================================== anchor Drawer state 및 변수, 렌더 페이지 선언
  let navigate = useNavigate();
  let [pageName,setPageName]=useState();

  let [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  let toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  let anchor = 'left'

  let list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon /> 
            </ListItemIcon>
            <ListItemText primary={cookies.load('loginStat') ? cookies.load('userInfo').user_name : ""} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>{navigate("/addaccount")}}>
            <ListItemIcon>
              <PersonAddIcon /> 
            </ListItemIcon>
            <ListItemText primary={"계정추가"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>{navigate("/mngaccount")}}>
            <ListItemIcon>
              <SupervisorAccountIcon /> 
            </ListItemIcon>
            <ListItemText primary={"계정관리"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={()=>{navigate("/edituserauth")}}>
            <ListItemIcon>
              <PostAddIcon /> 
            </ListItemIcon>
            <ListItemText primary={"권한부여"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(anchor, true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React SPA Foundation
            </Typography>
            <Button color="inherit" onClick={()=>{
              cookies.remove('loginStat', {path :'/',})
              cookies.remove('userInfo', {path :'/',})
              axios.get("/logout").then((res)=>{}).catch((err)=>console.log(err))
              navigate("/userlogin")}}>{cookies.load('loginStat') ? "LOGOUT" : "LOGIN"}</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{height:'70px'}}>Appbar is here</div>

      <Routes>
        <Route path='/' element={<div>home</div>}/>
        <Route path='/addaccount' element={<AddAccount/>}/>
        <Route path='/mngaccount' element={<MngAccount/>}/>
        <Route path='/editaccount' element={<EditAccount/>}/>
        <Route path='/edituserauth' element={<EditUserAuth/>}/>
        <Route path='/authlist' element={<div>authlist</div>}/>
        <Route path='/item1-1' element={ <div>item1-1</div> }/>
        <Route path='/item2-1' element={ <div>item2-1</div>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/login' element={<UserLogin/>}/>
      </Routes>

    </div>
  );
}

export default App;