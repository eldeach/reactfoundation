import { Form, FloatingLabel, Button,Container,Row,Col    } from 'react-bootstrap';
import axios from 'axios'
import { useState } from 'react';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import {setLoginStat, setUserInfo} from "./../store.js"
import cookies from 'react-cookies'


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
            const expires = new Date()
            expires.setMinutes(expires.getMinutes() + 1)
            console.log(expires)
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

   
      setDisabled(true);
      event.preventDefault();
      await new Promise((r) => setTimeout(r, 1000));
      //alert(`로그인한 아이디: ${id}`);
      setDisabled(false);
     };

    return(
        <div className="loginPage">
            <Container>
                <Row>
                    <h1>react foundation Login</h1>
                </Row>
                <Row><div style={{height: "50px"}}></div></Row>
                <Row>
                    <Col/>
                    <Col>
                        <Form onSubmit={handleSubmit}>
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
                    </Col>
                    <Col/>
                </Row>
            </Container>
        </div>
    )
}

export default LoginForm