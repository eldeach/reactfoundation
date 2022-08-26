//========================================================== React 라이브러리 import
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//========================================================== Material UI 라이브러리 import
import { DataGrid,GridToolbar  } from '@mui/x-data-grid';
import {Box,TextField,Stack,Button} from '@mui/material/';
//---------------------------------------------------------- Material Icons
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LineWeightIcon from '@mui/icons-material/LineWeight';
//========================================================== Formik & Yup 라이브러리 import
import { Formik } from 'formik';
import * as yup from 'yup';
//========================================================== axios 라이브러리 import
import axios from 'axios';
//========================================================== Moment 라이브러리 import
import moment from 'moment';
import 'moment/locale/ko';	//대한민국
//========================================================== Slide Popup 컴포넌트 & Redux import
import { useDispatch, useSelector } from "react-redux"
import { setSldiePopupFunc, setSlidePopup, setSP_SelectAccount_store_one} from "./../store.js"

function SP_SelectAccount_store(props) {
  //========================================================== [Redux] Slide Popup state 접근용
  let rdx = useSelector((state) => { return state } )
  let dispatch = useDispatch();

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

  //========================================================== [변수, 객체 선언][useEffect]
  useEffect(() => {
    //초기 Table 조회
    InitializeTbl()
  },[]);

  //========================================================== [함수][테이블] 전체 조회
  async function InitializeTbl (){
    setCols((await InitialQry({searchKeyWord : ""})).tempCol)
    setRows((await InitialQry({searchKeyWord : ""})).tempRow)
  }

  //========================================================== [함수][테이블] 서버 데이터 조회 (검색기능)
  async function InitialQry(para){ 

    let ajaxData = await axios({
      method:"get",
      url:"/getmngaccount",
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
   
      ajaxData.map((oneRow,i)=>{
          let tempObjs = oneRow
          tempObjs["id"]=(i+1)
          tempObjs["insert_datetime"] = moment(new Date(tempObjs["insert_datetime"])).format('YYYY-MM-DD HH:mm:ss');
          tempObjs["update_datetime"] = moment(new Date(tempObjs["update_datetime"])).format('YYYY-MM-DD HH:mm:ss');
          tempRow.push(tempObjs)
      })
    }
    
    return ({tempCol:tempCol, tempRow:tempRow})
  
  }

  //========================================================== [페이지]
  return (
    <div style={{display:'block'}}>
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
        <Box
        id="tblCtrlForm"
        component="form"
        // sx={{
        //   '& .MuiTextField-root': { m: 1, width: '25ch' },
        // }}
        sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent:'center' }}
        noValidate
        onSubmit={handleSubmit}
        autoComplete="off"
        >
          <SupervisorAccountIcon style={{fontSize: "40px",paddingTop:'20px'}} fontSize ="inherit" color="primary"/>
          <TextField
            style={{width:'20%'}}
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
          <div className='content-middle'>
          <Button style={{marginLeft:'5px'}} size="small" variant="contained" type="submit" form="tblCtrlForm" disabled={isSubmitting}>Search</Button>
          <Button style={{marginLeft:'5px'}} size="small" variant="outlined" type="reset" disabled={isResetting} onClick={async ()=>{
            setIsResetting(true)
            resetForm()
            setCols((await InitialQry({searchKeyWord : ""})).tempCol)
            setRows((await InitialQry({searchKeyWord : ""})).tempRow)
            setIsResetting(false)
            }}>Reset</Button>
          <Button style={{marginLeft:'5px'}} size="small" variant="outlined" onClick={async ()=>{
            if(rowHtAuto) setRowHtAuto(false)
            else setRowHtAuto(true)
          }}><LineWeightIcon/></Button>
          </div>
        </Box>
      )}
      </Formik>
    {/* //====================================================== [테이블] */}
      <div style={{ height: 600, width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
          <DataGrid
              rows={rows}
              columns={cols}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[1, 10, 20]}
              pagination
              checkboxSelection={props.multipleRow}
              getRowHeight={() => rowHtAuto?'auto':''}
              components={{ Toolbar: GridToolbar }}
              onRowDoubleClick={(params,event,details)=>{
                if(!props.multipleRow){
                  dispatch(setSP_SelectAccount_store_one(params.row))
                  dispatch(setSldiePopupFunc(""))
                  dispatch(setSlidePopup(false))
                }
              }}
            />
          </div>
        </div> 
      </div>   
    </div>
  );
}

export default SP_SelectAccount_store



