import * as React from 'react';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles' 
import PanToolIcon from '@mui/icons-material/PanTool';


import { Formik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import cookies from 'react-cookies'
import { EditRoadTwoTone } from '@mui/icons-material';

//========================================================== Slide Popup config
const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  wrapper: {
    width: 100 + theme.spacing(2),
  },
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));


function AccountMng() {
  //========================================================== [변수, 객체 선언][useNaviagte]
  let navigate = useNavigate()

  //========================================================== [변수, 객체 선언][테이블 조작 폼] 작동 Satae 정의
  let [isSubmitting, setIsSubmitting] = useState(false); // Submit 중복 클릭 방지
  let [isResetting, setIsResetting] = useState(false); // Reset 중복 클릭 방지

  //========================================================== [변수, 객체 선언][테이블 조작 폼] 유효성 검사 yup 스키마
  const schema = yup.object().shape({
    searchKeyWord: yup.string()
    .required('검색어를 입력해주세요.')
  });

  //========================================================== [변수, 객체 선언][테이블] DataGrid Table 작동 state 정의
  let [pageSize, setPageSize] = useState(20);
  let [rowHtAuto,setRowHtAuto] = useState(false);
  let [cols,setCols] = useState([]); // Material UI Col 정의 State
  let [rows,setRows] = useState([]); // Material UI Row 정의 State

  //========================================================== [변수, 객체 선언][슬라이드 팝업] 작동 state 정의
  let classes = useStyles();
  let [slidePopUp, setSlidePopUp] = useState(false);
  let [rowObj,setRowObj] = useState({});
  let [popUpConfirming,isPopUpConfirming]=useState(false);

  //========================================================== [변수, 객체 선언][useEffect]
  useEffect(() => {
    // 이 페이지의 권한 유무 확인
    authCheck()
    //초기 Table 조회
    InitializeTbl()
  },[]);

  //========================================================== [함수][권한] 권한 점검
  function authCheck(){
    if(!(cookies.load('loginStat') && cookies.load('userInfo').user_auth.indexOf("ACCOUNTMNG",0)!=-1)){
      alert("권한이 없습니다.")
      navigate('/')
    }
  }

  //========================================================== [함수][테이블] 전체 조회
  async function InitializeTbl (){
    setCols((await InitialQry({searchKeyWord : ""})).tempCol)
    setRows((await InitialQry({searchKeyWord : ""})).tempRow)
  }

  //========================================================== [함수][테이블] 서버 데이터 조회 (검색기능)
  async function InitialQry(para){ 

    let ajaxData = await axios({
      method:"get",
      url:"/getaccountmng",
      params:para,
      headers:{
          'Content-Type':'application/json'
      }})
      .then((res)=>res.data)
      .catch((err)=>alert(err))
  
    let tempCol=[]
    let tempRow =[]
  
    if (ajaxData.length>0){
        
      Object.keys(ajaxData[0]).map((columName,i)=>{
        tempCol.push({field:columName,headerName:`${columName}`,width:(columName.length*13)})
      })

      tempCol.push({
        field: 'action',
        headerName: 'Action',
        sortable: false,
        renderCell:(cellValues) => {
          return (
            <Button
              variant="contained"
              onClick={(event) => {
                if(!(cookies.load('loginStat') && cookies.load('userInfo').user_auth.indexOf("ADDACCOUNT",0)!=-1)){
                  alert("권한이 없습니다.")
                }
                else{
                  console.log(rowObj)
                }
              }}
            >
              <EditIcon fontSize="small"/>
            </Button>
          )}
      })

      tempCol.push({
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell:(cellValues) => {
          return (
            <Button
              variant="contained"
              onClick={async (event) => {
                if(!(cookies.load('loginStat') && cookies.load('userInfo').user_auth.indexOf("DELETEACCOUNT",0)!=-1)){
                  alert("권한이 없습니다.")
                }
                else{
                  setSlidePopUp(true);
                  setRowObj(cellValues.row)
                }
              }}
            >
              <DeleteForeverIcon fontSize="small"/>
            </Button>
          )}
      })
    
      ajaxData.map((oneRow,i)=>{
          let tempObjs = oneRow
          tempObjs["id"]=(i+1)
          tempRow.push(tempObjs)
      })
    }
    
    return ({tempCol:tempCol, tempRow:tempRow})
  
  }

  //========================================================== [페이지]
  return (
  <div>
    <Stack spacing={2}>
      <div className="content-middle">
  {/* //====================================================== [테이블 조작 폼] */}
        <Formik
          validationSchema={schema}
          onSubmit={async (values, {resetForm})=>{
            let para = {
              searchKeyWord: values.searchKeyWord,
            }
            setIsSubmitting(true);
            setCols((await InitialQry(para)).tempCol)
            setRows((await InitialQry(para)).tempRow)
            resetForm()
            setIsSubmitting(false);
          }}
          initialValues={{
            searchKeyWord: ''
          }}
        >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          validateField,
          values,
          touched,
          resetForm,
          isValid,
          errors,
        })=>(
          <Stack direction="row" spacing={2}>
            <Box
            id="tblCtrlForm"
            component="form"
            // sx={{
            //   '& .MuiTextField-root': { m: 1, width: '25ch' },
            // }}
            sx={{ width: 500, display: 'flex', flexWrap: 'wrap' }}
            noValidate
            onSubmit={handleSubmit}
            autoComplete="off"
            >
              <TextField
                required
                variant="standard"
                id="searchKeyWord"
                name="searchKeyWord"
                label="Search"
                value={values.searchKeyWord}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.searchKeyWord ? errors.searchKeyWord : ""}
                error={touched.searchKeyWord && Boolean(errors.searchKeyWord)}
                margin="dense"
                fullWidth
              />
            </Box>
              <div className='content-middle'>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" type="submit" form="tblCtrlForm" disabled={isSubmitting}>Search</Button>
                  <Button variant="outlined" type="reset" disabled={isResetting} onClick={async ()=>{
                    setIsResetting(true)
                    resetForm()
                    setCols((await InitialQry({searchKeyWord : ""})).tempCol)
                    setRows((await InitialQry({searchKeyWord : ""})).tempRow)
                    setIsResetting(false)
                    }}>Reset</Button>
                    <Button variant="outlined" disabled={isResetting} onClick={async ()=>{
                      if(rowHtAuto) setRowHtAuto(false)
                      else setRowHtAuto(true)
                    }}>{rowHtAuto?"Row Height : Current Auto":"Row Height : Current Fixed"}</Button>
                </Stack>
              </div>
            </Stack>
        )}
        </Formik>
  {/* //====================================================== [삭제 팝업] */}
        <div className="slide-popup">
          <Slide direction="up" in={slidePopUp} mountOnEnter unmountOnExit>
            <Stack spacing={2}>
              <Paper style={{padding:'20px'}} elevation={4} className={classes.paper}>
                <div style={{height:'700px'}}>
                  <DeletePopup rowObj={rowObj}/>
                </div>
                  <div className="content-middle">
                    <Stack spacing={2} direction="row">
                      <Button variant="contained" disabled={popUpConfirming} onClick={async ()=>{
                        isPopUpConfirming(true)
                        DeleteRow(rowObj)
                        setCols((await InitialQry({searchKeyWord : ""})).tempCol)
                        setRows((await InitialQry({searchKeyWord : ""})).tempRow)
                        setRowObj({})
                        isPopUpConfirming(false)
                        setSlidePopUp(false)
                      }}>Confirm</Button>
                    <Button variant="outlined" onClick={async ()=>{
                      setSlidePopUp(false)
                    }}>Cancel</Button>
                  </Stack>
                </div>
              </Paper>
            </Stack>
          </Slide>
        </div>
      </div>
  {/* //====================================================== [테이블] */}
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="content-middle" style={{ flexGrow: 1 }}>
              <DataGrid
                rows={rows}
                columns={cols}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[1, 10, 20]}
                pagination
                checkboxSelection
                getRowHeight={() => rowHtAuto?'auto':''}
                components={{ Toolbar: GridToolbar }}
              />
          </div>
        </div> 
      </div>       
    </Stack>
  </div>
  );
}

export default AccountMng

function DeletePopup(props){
  return(
    <div style={{alignItems:"center"}}>
      <div style={{color:"orange", fontSize: "100px"}}><PanToolIcon fontSize ="inherit"/></div>
      <div style={{fontSize: "40px"}}>주의! 아래 정보가 삭제됩니다.</div>
      <div style={{height:"24px"}}></div>
      <div style={{width:"100%", height:"440px", justifyContent:"center", textAlign:"left",border:"1px solid", borderRadius:"5px 5px", padding:"10px", overflow:"scroll"}}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>계정</div>
            <div >{props.rowObj.user_account}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>사용자명</div>
            <div >{props.rowObj.user_name}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>직책</div>
            <div >{props.rowObj.user_position}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>팀</div>
            <div >{props.rowObj.user_team}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>회사</div>
            <div >{props.rowObj.user_company}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>E-Mail</div>
            <div >{props.rowObj.user_email}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>전화</div>
            <div >{props.rowObj.user_phone}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>비고</div>
            <div >{props.rowObj.remark}</div>
          </Stack>
          <Stack direction="row" spacing={2}>
            <div className='delete-item'>UUID</div>
            <div >{props.rowObj.uuid_binary}</div>
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

async function EditRow(){
  alert("수정완료")
}