import { Form, FloatingLabel, Button } from 'react-bootstrap';
import axios from 'axios'
import { useState } from 'react';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import {setLoginStat, setUserInfo} from "./../store.js"


function LoginForm(){

    let rdx= useSelector((state)=>{return state});
    let dispatch = useDispatch();

    let navigate = useNavigate()

    let [id,setId] = useState("")
    let [pw,setPw] = useState("")
  
    const [disabled, setDisabled] = useState(false);
  
    const handlePwChange = ({ target: { value } }) => setPw(value);
    const handleIdChange = ({ target: { value } }) => setId(value);
    const handleSubmit = async (event) => {
  
      let body = {
        id: id,
        pw: pw
      }
  
      axios.post("/login",body).then(function(res){
        console.log(res.data)
        if (res.data.loginStat){
            dispatch(setLoginStat(res.data.loginStat))
            dispatch(setUserInfo(res.data.userInfo))
        }
        else {
            if(res.data.flashMsg=="wrong PW"){
                alert("비밀번호가 틀렸습니다.")
            }
            else if(res.data.flashMsg=="no user_account"){
                alert("존재하지 않는 계정입니다.")
            }else if(res.data.flashMsg=="no auth"){
                alert("이 계정은 권한이 없습니다.")
            }
        }

        
        navigate("/")
      }).catch((err)=>console.log(err))

   
      setDisabled(true);
      event.preventDefault();
      await new Promise((r) => setTimeout(r, 1000));
      //alert(`로그인한 아이디: ${id}`);
      setDisabled(false);
     };

    return(
        <div className="loginPage">
            <Form className="loginForm" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicID">
                    <FloatingLabel
                        controlId="floatingInputEnterID"
                        label="Enter ID"
                        className="mb-3 text-muted"
                    >
                        <Form.Control type="id" placeholder="Enter ID" name="id" value={id} onChange={handleIdChange}/>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingInputPassword"
                        label="Password"
                        className="mb-3 text-muted"
                    >
                        <Form.Control type="password" placeholder="Password" name="pw" value={pw} onChange={handlePwChange}/>
                    </FloatingLabel>
                </Form.Group>


                <Button variant="primary" type="submit" disabled={disabled}>
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm