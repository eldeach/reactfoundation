
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
    overflow:'scroll',
    padding:'20px'
  };


  let [refresh,setRefresh] = useState(false);

  //========================================================== [변수, 객체 선언][useNaviagte]
  let navigate = useNavigate()

  //========================================================== SlidePopup 작동 redux state 관련 선언
  let rdx = useSelector((state) => { return state } )
  let dispatch = useDispatch();

  //========================================================== [변수, 객체 선언][useEffect]
  useEffect(() => {
    // 이 페이지의 권한 유무 확인
    authCheck()
  },[]);

  //========================================================== [함수][권한] 권한 점검
  function authCheck(){
    if(!(cookies.load('loginStat') && cookies.load('userInfo').user_auth.indexOf("EDITUSERAUTH",0)!=-1)){
      alert("권한이 없습니다.")
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
                <div style={{fontSize:'30px'}}>{rdx.sel_tb_user.user_name}</div>
                <div style={{fontSize:'15px'}}>{rdx.sel_tb_user.user_account}</div>
              </div>
              <div style={{display: "flex", justifyContent: "flex-end", width:"18%"}}>
                <Button size="small" variant="contained" onClick={()=>{
                  setModalTitle("계정 선택")
                  handleModalOpen()
                  setRefresh(false)
                  }}>선택</Button>
              </div>
            </div>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="직책" color="primary" variant="outlined" />
              <div className='info-item-content'>{rdx.sel_tb_user.user_position}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="팀" color="primary" variant="outlined" />
              <div className='info-item-content'>{rdx.sel_tb_user.user_team}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="회사" color="primary" variant="outlined" />
              <div className='info-item-content'>{rdx.sel_tb_user.user_company}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="E-Mail" color="primary" variant="outlined" />
              <div className='info-item-content'>{rdx.sel_tb_user.user_email}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="전화" color="primary" variant="outlined" />
              <div className='info-item-content'>{rdx.sel_tb_user.user_phone}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="Remark" color="primary" variant="outlined" />
              <div className='info-item-content'>{rdx.sel_tb_user.remark}</div>
            </Stack>
            <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Chip className="info-item" label="UUID" color="primary" variant="outlined" />
              <div className='info-item-content'>{rdx.sel_tb_user.uuid_binary}</div>
            </Stack>
            <Button size="small" variant="contained" onClick={async ()=>{
              setRefresh(true)
              }}>Confirm</Button>
          </Stack>
        </Paper>
        <Paper style={{width:'75%', padding:'20px', marginLeft:'10px',marginRight:'10px'}} elevation={3}>
          <Stack spacing={2}>
            {
              refresh?<MngTable getUrlStr={'/edituserauth_getusernoauth'} targetPk={{user_account:rdx.sel_tb_user.user_account}} chkSel={true} deleteButton={false} addToListButton={true} editable={false} selectButton={false}/>:<div></div>
            }
            {
              refresh?<MngTable getUrlStr={'/edituserauth_getuserauth'} targetPk={{user_account:rdx.sel_tb_user.user_account}} chkSel={true} deleteButton={true} addToListButton={false} editable={false} selectButton={false}/>:<div></div>
            }
          </Stack>
        </Paper>
          <Modal open={openModal} onClose={handleModalClose}>
            <Paper style={modalStyle} elevation={5}>
              <div style={{width: '100%', display: 'block'}}>
                <div style={{width:'100%',display:'flex'}}>
                  <div style={{width:'50%',display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                    <PrivacyTipIcon color="primary"/>
                    <div>{modalTitle}</div>
                  </div>
                  <div style={{width:'50%',display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
                    <Button size="small" variant="outlined" onClick={()=>{handleModalClose()}}>Close</Button>
                  </div>
                </div>
                <Divider style={{marginTop:'5px',marginBottom:'10px'}}/>
                <div style={{display:'block', height:'550px', overflow:"scroll"}}>
                  <MngTable getUrlStr={'/edituserauth_getuser'} targetPk={{}} chkSel={false} deleteButton={false} addToListButton={false} editable={false} selectButton={true}/>
                </div>
              </div>
            </Paper>
          </Modal>
      </Stack>
  );
}

export default EditUserAuth