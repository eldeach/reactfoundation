
//========================================================== React 라이브러리 import
import * as React from 'react';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
//========================================================== Material UI 라이브러리 import
import {Chip, Button, Stack, Paper,Divider,Modal, Checkbox, ListItemIcon, ListItemText, ListItem, CardHeader, Card, List, Grid} from '@mui/material/';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
//========================================================== cookie 라이브러리 import
import cookies from 'react-cookies'
//========================================================== Slide Popup 컴포넌트 & Redux import
import { useDispatch, useSelector } from "react-redux"
//========================================================== axios 라이브러리 import
import axios from 'axios';
//========================================================== MngTable 컴포넌트 import
import MngTable from './../MngTable/MngTable'

function EditUserAuth() {
  //========================================================== [Modal] 모달 열기/닫기 및 스타일 정의
  let [openModal, setOpenModal] = useState(false);
  let handleModalOpen = () => setOpenModal(true);
  let handleModalClose = () => setOpenModal(false);
  let [modalTitle,setModalTitle] = useState(false);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height:'600px',
    overflow:'auto',
    padding:'20px'
  };


  let [refresh,setRefresh] = useState(false);

  //========================================================== [변수, 객체 선언][useNaviagte]
  let navigate = useNavigate()

  //========================================================== SlidePopup 작동 redux state 관련 선언
  let rdx = useSelector((state) => { return state } )
  let dispatch = useDispatch();

  //========================================================== [MyInfo] 현재값 조회 state 및 함수 선언
  let [initMyInfo,setInitMyInfo]=useState({})
  async function myInfo(){
    if(cookies.load('loginStat')){
    let ajaxStat
    let ajaxData = await axios({
      method:"get",
      url:"/getmypage",
      params:{user_account:cookies.load("userInfo").user_account},
      headers:{
          'Content-Type':'application/json'
      }})
      .then((res)=>{
        ajaxStat=res.data.success
        setInitMyInfo(res.data.result[0])
        return res.data.result[0]
      })
      .catch((err)=>console.log(err))
    // get URL 및 params 가변 코드 라인 끝
    
    if(!ajaxStat) alert("테이블 정보 조회를 실패했습니다.")
    }
  }


  //========================================================== [변수, 객체 선언][useEffect]
  useEffect(() => {
    // 이 페이지의 권한 유무 확인
    authCheck()
    // 내 정보 현재값 조회
    myInfo()
  },[]);

  //========================================================== [함수][권한] 권한 점검
  function authCheck(){
    if(cookies.load('loginStat')){

    }
    else{
        alert("로그인 상태가 아닙니다.")
        navigate('/')
    }
  }


  return (
      <Stack style={{padding:'10px'}} direction='row' spacing={2}>
        <Paper style={{width:'25%', height:'650px',  padding:'20px', marginLeft:'10px',marginRight:'10px'}} elevation={3}>
          <Stack spacing={5}>
            <div style={{display:'flex', alignContent:'center'}}>
              <AccountCircleIcon style={{fontSize: "58px",width:"12%"}} fontSize ="inherit" color="primary"/>
              <div style={{display:'block',  width:"70%"}}>
                <div style={{fontSize:'30px'}}>{initMyInfo.user_name}</div>
                <div style={{fontSize:'15px'}}>{initMyInfo.user_account}</div>
              </div>
            </div>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="직책" color="primary" variant="outlined" />
              <div className='info-item-content'>{initMyInfo.user_position}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="팀" color="primary" variant="outlined" />
              <div className='info-item-content'>{initMyInfo.user_team}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="회사" color="primary" variant="outlined" />
              <div className='info-item-content'>{initMyInfo.user_company}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="E-Mail" color="primary" variant="outlined" />
              <div className='info-item-content'>{initMyInfo.user_email}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="전화" color="primary" variant="outlined" />
              <div className='info-item-content'>{initMyInfo.user_phone}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="Remark" color="primary" variant="outlined" />
              <div className='info-item-content'>{initMyInfo.remark}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="UUID" color="primary" variant="outlined" />
              <div className='info-item-content'>{initMyInfo.uuid_binary}</div>
            </Stack>
          </Stack>
        </Paper>
        <Paper style={{width:'75%', padding:'20px', marginLeft:'10px',marginRight:'10px'}} elevation={3}>
              <div>aa</div>
        </Paper>
      </Stack>
  );
}

export default EditUserAuth