//========================================================== React 라이브러리 import
import * as React from 'react';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
//========================================================== Material UI 라이브러리 import
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
//========================================================== Formik & Yup 라이브러리 import
import { Formik } from 'formik';
import * as yup from 'yup';
//========================================================== axios 라이브러리 import
import axios from 'axios';
//========================================================== cookie 라이브러리 import
import cookies from 'react-cookies'


function UserLogin() {
  //========================================================== useNaviagte 선언
  let navigate = useNavigate()

  //========================================================== Form 작동 Satae 정의 정의
  let [isSubmitting, setIsSubmitting] = useState(false); // Submit 중복 클릭 방지
  let [isResetting, setIsResetting] = useState(false); // Reset 중복 클릭 방지

  //========================================================== Formik & yup Validation schema
  const schema = yup.object().shape({

    user_account: yup.string()
    .required('계정을 입력해주세요.'),

    user_pw: yup.string()
    .required('비밀번호를 입력해주세요.')
  });

  //========================================================== useEffect 코드
  useEffect(() => {

  },[]);

  async function formPost(qryBody){ 
      axios.post("/login",qryBody).then(function(res){
        if (res.data.loginStat){
            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + 1)
            cookies.save('loginStat',res.data.loginStat,{path :'/',
            //expires:expires,          // 유효 시간
            //secure: true,   // 웹 브라우저와 웹 서버가 https로 통신하는 경우에만 쿠키 저장
            //httpOnly: true  // document.cookie라는 자바스크립트 코드로 쿠키에 비정상적으로 접속하는 것을 막는 옵션
            })
            cookies.save('userInfo',res.data.userInfo,{path :'/',
                //expires:expires,          // 유효 시간
                //secure: true,   // 웹 브라우저와 웹 서버가 https로 통신하는 경우에만 쿠키 저장
                //httpOnly: true  // document.cookie라는 자바스크립트 코드로 쿠키에 비정상적으로 접속하는 것을 막는 옵션
            })
            navigate("/")
        }
        else {
            if(res.data.flashMsg=="wrong PW"){
                alert("비밀번호가 틀렸습니다.")
                navigate("/login")
            }
            else if(res.data.flashMsg=="no user_account"){
                alert("존재하지 않는 계정입니다.")
                navigate("/login")
            }else if(res.data.flashMsg=="no auth"){
                alert("이 계정은 권한이 없습니다.")
                navigate("/login")
            }
        }
      }).catch((err)=>alert(err))
  }

  return (
      <div className="content-middle">
        <Formik
          validationSchema={schema}
          onSubmit={async (values, {resetForm})=>{
            let qryBody = {
              id: values.user_account,
              pw:values.user_pw
            }
            setIsSubmitting(true);
            await formPost(qryBody)
            resetForm()
            setIsSubmitting(false);
          }}
          initialValues={{
            user_account: '',
            user_pw:'',
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
                <div style={{height: "40px"}}></div>
                <div style={{fontSize: "100px"}}><LockIcon fontSize ="inherit" color="primary"/></div>
                <div style={{fontSize: "40px"}}>LOGIN</div>
                <div style={{height: "40px"}}></div>
                <Stack spacing={2}>
                    <Box
                    id="postform"
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

                    <TextField
                    required
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
                    </Box>
                    <div className='content-middle'>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" type="submit" form="postform" disabled={isSubmitting}>Submit</Button>
                        <Button variant="outlined" type="reset" disabled={isResetting} onClick={async ()=>{
                        setIsResetting(true)
                        resetForm()
                        setIsResetting(false)
                        }}>Reset</Button>
                    </Stack>
                    </div>
                </Stack>
            </div>
        )}
        </Formik>
      </div>     
  );
}

export default UserLogin