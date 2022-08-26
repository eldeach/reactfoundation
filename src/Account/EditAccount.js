//========================================================== React 라이브러리 import
import * as React from 'react';
import { useEffect, useState } from 'react';
import {  useNavigate, useLocation } from 'react-router-dom';
//========================================================== Material UI 라이브러리 import
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
//========================================================== Formik & Yup 라이브러리 import
import { Formik } from 'formik';
import * as yup from 'yup';
//========================================================== axios 라이브러리 import
import axios from 'axios';
//========================================================== cookie 라이브러리 import
import cookies from 'react-cookies'


function EditAccount() {
  //========================================================== useNaviagte 선언
  let navigate = useNavigate()

  //========================================================== Form 작동 Satae 정의 정의
  let [isSubmitting, setIsSubmitting] = useState(false); // Submit 중복 클릭 방지
  let [isResetting, setIsResetting] = useState(false); // Reset 중복 클릭 방지
  //let [isIdConfirming, setIsIdConfirming] = useState(false); // Id Confirm 중복 클릭 방지 disabled={true} //[ADD form에서 생략][PK관련] PK열은 수정지원 안 함
  //let [uniqueIdCheck,setUniqueIdCheck] = useState(false); // user_account 유일성 점검을 한적이 있는지 체크 //[ADD form에서 생략][PK관련] PK열은 수정지원 안 함
  //let [uniqueId,setUniqueId] = useState(false); // user_account 유일성이 확보되어 있는지 체크 //[ADD form에서 생략][PK관련] PK열은 수정지원 안 함

  //========================================================== Formik & yup Validation schema
  const schema = yup.object().shape({
    
    // user_account: yup.string() //[ADD form에서 생략][PK관련] PK열은 수정지원 안 함
    // .required('계정을 입력해주세요.')
    // .test(
    //     'useraccount_blank_check',
    //     "공백은 없어야 합니다.",
    //     function(value){
    //         if(typeof(value)=="string"){
    //             return !value.includes(" ")
    //         }
    //     }
    // )
    // .test(
    //     'is_unique_useraccount',
    //     '계정 중복체크가 필요합니다.',
    //     (value, context) => uniqueIdCheck
    // )
    // .test(
    //   'not_dup_useraccount',
    //   '중복된 계정입니다.',
    //   (value, context) => uniqueId
    // ),
    // user_pw: yup.string() //[ADD form에서 생략][별도 수단 제공] PW 변경은 별도 수단으로 제공
    // .required('비밀번호를 입력해주세요.')
    // .test(
    //     'useraccount_blank_check',
    //     "공백은 없어야 합니다.",
    //     function(value){
    //         if(typeof(value)=="string"){
    //             return !value.includes(" ")
    //         }
    //     }
    // ),
    // user_pw_check: yup.string() //[ADD form에서 생략][별도 수단 제공] PW 변경은 별도 수단으로 제공
    // .required('비밀번호를 재입력해주세요.')
    // .oneOf([yup.ref('user_pw'), null], '재입력한 비밀번호는 일치해야합니다.'),
    user_name: yup.string().required('사용자명을 입력해주세요.'),
    user_team : yup.string().required('팀명을 입력해주세요.'),
    user_email: yup.string().required('이메일을 입력해주세요.').email("올바르지 않은 이메일 형식입니다."),
    user_phone: yup.string().matches(
        /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/,
        "유효하지 않은 전화번호입니다."
      )
  });

  //========================================================== [ADD form에서 추가] 수정할 row Oject state 넘겨받기 위한 코드
  const location = useLocation();
  const targetRowObj= (!location.state ? "N/A" : location.state.rowObj)

  //========================================================== useEffect 코드
  useEffect(() => {
    // 이 페이지의 권한 유무 확인
    authCheck()
  },[]);

  function authCheck(){
    if(!(cookies.load('loginStat') && cookies.load('userInfo').user_auth.indexOf("EDITACCOUNT",0)!=-1)){
      alert("권한이 없습니다.")
      navigate('/')
    }
  }

  async function formPut(qryBody){ //[ADD form에서 변경][AJAX 타입 변경] POST에서 PUT AJAX로 변경
    let ajaxData = await axios.put("/putediteaccount",qryBody)
    .then((res)=>res.data)
    .catch((err)=>console.log(err))
    return ajaxData 
  }

  return (
      <div className="content-middle" style={{paddingBottom:'40px'}}>
        <Formik
          validationSchema={schema}
          onSubmit={async (values, {resetForm})=>{
            let qryBody = {
              // user_account: values.user_account, //[ADD form에서 생략][PK관련] PK열은 수정지원 안 함
              // user_pw:values.user_pw, //[ADD form에서 생략][별도 수단 제공] PW 변경은 별도 수단으로 제공
              user_name:values.user_name,
              user_position:values.user_position,
              user_team:values.user_team,
              user_company:values.user_company,
              user_email:values.user_email,
              user_phone:values.user_phone,
              remark: values.remark,
              update_by:cookies.load('userInfo').user_account,
              uuid_binary:values.uuid_binary //[ADD form에서 추가] UPDATE할 Row 검색용 UUID 추가
            }
            setIsSubmitting(true);
            console.log(await formPut(qryBody))
            resetForm()
            setIsSubmitting(false);
            navigate('/mngaccount') //[ADD form에서 추가] 호출했던 mng 페이지로 navigate
          }}
          initialValues={{
            user_account: targetRowObj.user_account, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            user_pw:'',
            user_pw_check:'',
            user_name:targetRowObj.user_name, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            user_position:targetRowObj.user_position, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            user_team:targetRowObj.user_team, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            user_company:targetRowObj.user_company, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            user_email:targetRowObj.user_email, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            user_phone:targetRowObj.user_phone, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            remark: targetRowObj.remark, //[ADD form에서 변경] 편집할 Row 데이터 출력 (초기값으로 출력)
            uuid_binary:targetRowObj.uuid_binary //[ADD form에서 추가] UPDATE할 Row 검색용 UUID 추가
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
          <div style={{alignItems:"center", textAlign:"center"}}>
            <div style={{height: "20px"}}></div>
            <div style={{fontSize: "100px"}}><ManageAccountsIcon fontSize ="inherit" color="primary"/></div>
            <div style={{fontSize: "40px"}}>Edit Account</div>
            <div style={{height: "20px"}}></div>
            <Stack spacing={2}>
              <Box
              id="posteditform"
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
                  disabled={true} //[ADD form에서 생략][PK관련] PK열은 수정지원 안 함
                  variant="standard"
                  id="user_account"
                  name="user_account"
                  label="User Account"
                  value={values.user_account}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_account ? errors.user_account : ""}
                  error={touched.user_account && Boolean(errors.user_account)}
                  margin="dense"
                  fullWidth
                />

                {/* <Button variant="outlined" disabled={true} //[ADD form에서 생략][PK관련] PK열은 수정지원 안 함
                onClick={async ()=>{
                  setUniqueIdCheck(true)
                  let body={
                    user_account : values.user_account
                  }
                  axios.post('/duplicatedaccountCheck',body).then(async (v)=>{
                    setIsIdConfirming(true)
                    if(v.data<1)setUniqueId(true)
                    else setUniqueId(false)
                    await new Promise((r) => setTimeout(r, 1000));
                    validateField('user_account')
                    setIsIdConfirming(false)
                  })
                }}>Confirm</Button> */}

                <TextField
                  required
                  disabled={true} //[ADD form에서 생략][별도 수단 제공] PW 변경은 별도 수단으로 제공
                  variant="standard"
                  id="user_pw"
                  name="user_pw"
                  label="Password"
                  type="password"
                  value={values.user_pw}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_pw ? errors.user_pw : ""}
                  error={touched.user_pw && Boolean(errors.user_pw)}
                  margin="dense"
                  fullWidth
                />

                <TextField
                  required
                  disabled={true} //[ADD form에서 생략][별도 수단 제공] PW 변경은 별도 수단으로 제공
                  variant="standard"
                  id="user_pw_check"
                  name="user_pw_check"
                  label="Password Check"
                  type="password"
                  value={values.user_pw_check}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_pw_check ? errors.user_pw_check : ""}
                  error={touched.user_pw_check && Boolean(errors.user_pw_check)}
                  margin="dense"
                  fullWidth
                />
                <Button variant="outlined" onClick={async ()=>{
                      let ajaxData = await axios.put("/resetaccountpw",{uuid_binary:values.uuid_binary})
                      .then((res)=>res.data)
                      .catch((err)=>err)
                  alert(ajaxData)
                  }}>Reset</Button> 

                <TextField
                  required
                  variant="standard"
                  id="user_name"
                  name="user_name"
                  label="User Name"
                  // type="text"
                  value={values.user_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_name ? errors.user_name : ""}
                  error={touched.user_name && Boolean(errors.user_name)}
                  margin="dense"
                  fullWidth
                />
                <TextField
                  variant="standard"
                  id="user_position"
                  name="user_position"
                  label="Position"
                  // type="text"
                  value={values.user_position}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_position ? errors.user_position : ""}
                  error={touched.user_position && Boolean(errors.user_position)}
                  margin="dense"
                  fullWidth
                />

                <TextField
                  required
                  variant="standard"
                  id="user_team"
                  name="user_team"
                  label="Team"
                  // type="text"
                  value={values.user_team}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_team ? errors.user_team : ""}
                  error={touched.user_team && Boolean(errors.user_team)}
                  margin="dense"
                  fullWidth
                />

                <TextField
                  required
                  variant="standard"
                  id="user_company"
                  name="user_company"
                  label="Company"
                  // type="text"
                  value={values.user_company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_company ? errors.user_company : ""}
                  error={touched.user_company && Boolean(errors.user_company)}
                  margin="dense"
                  fullWidth
                />

                <TextField
                  required
                  variant="standard"
                  id="user_email"
                  name="user_email"
                  label="E-Mail"
                  // type="email"
                  value={values.user_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_email ? errors.user_email : ""}
                  error={touched.user_email && Boolean(errors.user_email)}
                  margin="dense"
                  fullWidth
                />
                <TextField
                  variant="standard"
                  id="user_phone"
                  name="user_phone"
                  label="Phone Number"
                  // type="tel"
                  value={values.user_phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.user_phone ? errors.user_phone : ""}
                  error={touched.user_phone && Boolean(errors.user_phone)}
                  margin="dense"
                  fullWidth
                />

                <TextField
                  variant="standard"
                  id="remark"
                  name="remark"
                  label="Remark"
                  multiline
                  rows={4}
                  value={values.remark}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.remark ? errors.remark : ""}
                  error={touched.remark && Boolean(errors.remark)}
                  margin="dense"
                  fullWidth
                />
                <TextField //[ADD form에서 추가] UPDATE할 Row 검색용 UUID 추가
                  variant="standard"
                  disabled={true}
                  id="uuid_binary"
                  name="uuid_binary"
                  label="UUID"
                  value={values.uuid_binary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.uuid_binary ? errors.uuid_binary : ""}
                  error={touched.uuid_binary && Boolean(errors.uuid_binary)}
                  margin="dense"
                  fullWidth
                />
              </Box>
              <div className='content-middle'>
                <Stack spacing={2} direction="row">
                  <Button variant="contained" type="submit" form="posteditform" disabled={isSubmitting}>Submit</Button>
                  <Button variant="outlined" type="reset" disabled={isResetting} onClick={async ()=>{
                    setIsResetting(true)
                    resetForm()
                    setIsResetting(false)
                    }}>Reset</Button>
                  <Button variant="outlined" onClick={()=>{
                    navigate(-1)
                  }}>Cancel</Button>
                </Stack>
              </div>
            </Stack>
          </div>
        )}
        </Formik>
      </div>     
  );
}

export default EditAccount