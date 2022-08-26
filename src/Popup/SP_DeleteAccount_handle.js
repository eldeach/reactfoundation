//========================================================== React 라이브러리 import
import { useState } from 'react';
//========================================================== Material UI 라이브러리 import
import {Chip, Divider, Stack,Button} from '@mui/material/';
//---------------------------------------------------------- Material Icons
import PanToolIcon from '@mui/icons-material/PanTool';
//========================================================== axios 라이브러리 import
import axios from 'axios';
//========================================================== Slide Popup 컴포넌트 & Redux import
import { useDispatch, useSelector } from "react-redux"
import { setSlidePopup, setSldiePopupFunc } from "./../store.js"

function SP_DeleteAccount_handle(){
  //========================================================== [Redux] Slide Popup state 접근용
  let rdx = useSelector((state) => { return state } )
  let dispatch = useDispatch();
  //========================================================== 
  let [popUpConfirming,isPopUpConfirming]=useState(false);
  return(
    <div>
      <Stack spacing={2}>
        <div>
          <DeletePopup rowObj={rdx.SP_DeleteAccount_handle}/>
        </div>
        <div className="content-middle">
          <Stack spacing={2} direction="row">
            <Button variant="contained" disabled={popUpConfirming} onClick={async ()=>{
              isPopUpConfirming(true)
              await DeleteRow(rdx.SP_DeleteAccount_handle)
              isPopUpConfirming(false)
              dispatch(setSldiePopupFunc(""))
              dispatch(setSlidePopup(false))
            }}>Confirm</Button>
            <Button variant="outlined" onClick={async ()=>{
              dispatch(setSldiePopupFunc(""))
              dispatch(setSlidePopup(false))
            }}>Cancel</Button>
          </Stack>
        </div>
      </Stack>
    </div>
  )
}

export default SP_DeleteAccount_handle


function DeletePopup(props){
  return(
    <div style={{alignItems:"center", textAlign:"center"}}>
      <div style={{color:"orange", fontSize: "100px"}}><PanToolIcon fontSize ="inherit"/></div>
      <div style={{fontSize: "40px"}}>주의! 아래 정보가 삭제됩니다.</div>
      <div style={{height:"24px"}}></div>
      <div style={{width:"100%", height:"440px", justifyContent:"center", textAlign:"left", padding:"10px", overflow:"scroll"}}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="계정" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.user_account}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="사용자명" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.user_name}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="직책" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.user_position}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="팀" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.user_team}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="회사" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.user_company}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="E-Mail" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.user_email}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="전화" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.user_phone}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="Remark" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.remark}</div>
          </Stack>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <Chip className="info-item" label="UUID" color="primary" variant="outlined" />
            <div className='info-item-content-long'>{props.rowObj.uuid_binary}</div>
          </Stack>
        </Stack>
      </div>
    </div>

  )
}

async function DeleteRow(rowObj){
  let para = {
    uuid_binary: rowObj.uuid_binary 
  }
  
  let delResult =  await axios({
    method:"delete",
    url:"/deleteaccount",
    params:para,
    headers:{
      'Content-Type':'application/json'
    }})
    .then((res)=>res.data)
    .catch((err)=>alert(err))
  alert(JSON.stringify(delResult));
}