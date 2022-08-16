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


import { Formik } from 'formik';
import * as yup from 'yup';

import axios from 'axios';

import cookies from 'react-cookies'


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
  //========================================================== useNaviagte 선언
  let navigate = useNavigate()

  //========================================================== Table Control Form 작동 Satae 정의 정의
  let [isSubmitting, setIsSubmitting] = useState(false); // Submit 중복 클릭 방지
  let [isResetting, setIsResetting] = useState(false); // Reset 중복 클릭 방지


  // //========================================================== DataGrid Table 작동 state 정의
  let [pageSize, setPageSize] = useState(20);
  let [rowHtAuto,setRowHtAuto] = useState(false);
  let [cols,setCols] = useState([]); // Material UI Col 정의 State
  let [rows,setRows] = useState([]); // Material UI Row 정의 State

  //========================================================== Formik & yup Validation schema
  const schema = yup.object().shape({
    searchKeyWord: yup.string()
    .required('검색어를 입력해주세요.')
  });

  //========================================================== Popup state 정의
  let classes = useStyles();
  let [slidePopUp, setSlidePopUp] = useState(false);
  let [rowObj,setRowObj] = useState({});
  let [popUpConfirming,isPopUpConfirming]=useState(false);

  //========================================================== useEffect 코드
  useEffect(() => {
    // 이 페이지의 권한 유무 확인
    authCheck()
    //초기 Table 조회
    InitializeTbl()
  },[]);

  function authCheck(){
    if(!(cookies.load('loginStat') && cookies.load('userInfo').user_auth.indexOf("ACCOUNTMNG",0)!=-1)){
      alert("권한이 없습니다.")
      navigate('/')
    }
  }

  async function InitializeTbl (){
    setCols((await InitialQry({searchKeyWord : ""})).tempCol)
    setRows((await InitialQry({searchKeyWord : ""})).tempRow)
  }

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
                alert(cellValues.row.uuid_binary);
                navigate("/createaccount",  { state: { uuid_binary: cellValues.row.uuid_binary} })
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
                  navigate('/')
                }
                else{
                  setSlidePopUp(true);
                  setRowObj(cellValues.row)
                  console.log(rowObj)
                  //DelRow(cellValues.row.uuid_binary)
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

  return (
  <div>
    <Stack spacing={2}>
      <div className="content-middle">
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
        <div className="slide-popup">
          <Slide direction="up" in={slidePopUp} mountOnEnter unmountOnExit>
            <Paper style={{padding:'20px'}} elevation={4} className={classes.paper}>
              <div>{rowObj.user_account}</div>
              <div>{rowObj.user_name}</div>
              <div>{rowObj.uuid_binary}</div>
              <Button variant="contained" disabled={popUpConfirming} onClick={async ()=>{
                isPopUpConfirming(true)
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
                setCols((await InitialQry({searchKeyWord : ""})).tempCol)
                setRows((await InitialQry({searchKeyWord : ""})).tempRow)
                setRowObj({})
                isPopUpConfirming(false)
                setSlidePopUp(false)
              }}>Confirm</Button>
              <Button variant="outlined" onClick={async ()=>{
                setSlidePopUp(false)
              }}>Cancel</Button>
            </Paper>
          </Slide>
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
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