import { Form, FloatingLabel, Button,Col,Row,InputGroup } from 'react-bootstrap';
import axios from 'axios'
import { useState } from 'react';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import {setLoginStat, setUserInfo} from "./../store.js"
import { Formik } from 'formik';
import * as yup from 'yup';



function LoginForm(){

    let rdx= useSelector((state)=>{return state});
    let dispatch = useDispatch();

    let navigate = useNavigate()

    const schema = yup.object().shape({
        id: yup.string().required('계정을 입력해주세요.'),
        pw: yup.string().required('비밀번호를 입력해주세요.'),
        username: yup.string().required('사용자명을 입력해주세요.'),
        team : yup.string().required('팀명을 입력해주세요.'),
        email: yup.string().email("올바르지 않은 이메일 형식입니다.").required('이메일을 입력해주세요.'),
        phone: yup.string().matches(
            /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/,
            "유효하지 않은 전화번호입니다."
          )
      });

    const [disabled, setDisabled] = useState(false);
  

    let [id,setId] = useState("")
    let [pw,setPw] = useState("")
    let [username,setUserName] = useState("")
    let [position,setPosition] = useState("")
    let [team,setTeam] = useState("")
    let [company,setCompany] = useState("")
    let [email,setEmail] = useState("")
    let [phone,setPhone] = useState("")
    let [remark,setRemark] = useState("")
    
    // const handleIdChange = ({ target: { value } }) => setId(value);
    // const handlePwChange = ({ target: { value } }) => setPw(value);
    // const handleUserNameChange = ({ target: { value } }) => setUserName(value);
    // const handlePositionChange = ({ target: { value } }) => setPosition(value);
    // const handleTeamChange = ({ target: { value } }) => setPosition(value);
    // const handleCompanyChange = ({ target: { value } }) => setCompany(value);
    // const handleEmailChange = ({ target: { value } }) => setEmail(value);
    // const handlePhoneChange = ({ target: { value } }) => setPhone(value);
    // const handleRemarkChange = ({ target: { value } }) => setRemark(value);

    // const handleSubmit = async (event) => {
    //     // const form = event.currentTarget ;
    //     // if (form.checkValidity() === false) {
    //     //     event.preventDefault();
    //     //     event.stopPropagation();
    //     //   }
          
    //     // setValidated(true);


    //         let body = {
    //             id: id,
    //             pw: pw,
    //             username: userName,
    //             position : position,
    //             team : team,
    //             company : company,
    //             email : email,
    //             phone : phone,
    //             remark : remark
    //         }
      
    //       axios.post("/createuseraccount",body).then(function(res){
    //         console.log(res)
    //         alert(`계정생성을 완료하였습니다. (${id})`);
    //       }).catch((err)=>console.log(err))
    
   
    //         // alert('정보가 불충분합니다.');
       
    //     setDisabled(true);
    //     event.preventDefault();
    //     await new Promise((r) => setTimeout(r, 1000));
    //     setDisabled(false);
      
    // };

    // const onSubmit = (values,actions) =>{
    //     console.log(values);
    //     console.log(actions)
    // }

    return(
        <div className="createAccountPage">
        <Formik
        validationSchema={schema}
        onSubmit={(values)=>{
            let body = {
                id: values.id,
                pw: values.pw,
                username: values.username,
                position : values.position,
                team : values.team,
                company : values.company,
                email : values.email,
                phone : values.phone,
                remark : values.remark
            }
      
            axios.post("/createuseraccount",body).then(function(res){
                console.log(res)
                alert(`계정생성을 완료하였습니다. (${id})`);
            }).catch((err)=>console.log(err))
        }}
        initialValues={{
            id: '',
            pw: '',
            username: '',
            position : '',
            team : '',
            company : '',
            email : '',
            phone : '',
            remark : ''
        }}
        >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        resetForm,
        isValid,
        errors,
      }) =>(
            <Form className="createAccountForm" noValidate onSubmit={handleSubmit}>
                <Row>
                    <Col sm={4}>
                        <Form.Group className="mb-3" controlId="userid">
                            <FloatingLabel controlId="floatingInputEnterID" label="Enter ID" className="mb-3 text-muted">
                                <Form.Control isInvalid={touched.id && errors.id} onChange={handleChange} onBlur={handleBlur} type="id" o placeholder="Enter ID" name="id" value={values.id}/>
                                <Form.Control.Feedback type="invalid">{errors.id}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userpw">
                            <FloatingLabel required controlId="floatingInputPassword" label="Password" className="mb-3 text-muted">
                                <Form.Control isInvalid={touched.pw && errors.pw} onChange={handleChange} onBlur={handleBlur} type="password" placeholder="Password" name="pw" value={values.pw}/>
                                <Form.Control.Feedback type="invalid">{errors.pw}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="username">
                            <FloatingLabel controlId="floatingUserName" label="User Name" className="mb-3 text-muted">
                            <Form.Control isInvalid={touched.username && errors.username} onChange={handleChange} onBlur={handleBlur} type="text"  placeholder="User Name" name="username" value={values.username}/>
                            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col sm={8}>
                        <Form.Group className="mb-3" controlId="userposition">
                            <FloatingLabel controlId="floatingInputPosition" label="User Position" className="mb-3 text-muted">
                                <Form.Control onChange={handleChange} type="text" placeholder="User Position" name="position" value={values.position}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userteam">
                            <FloatingLabel controlId="floatingInputTeam" label="User Team" className="mb-3 text-muted">
                                <Form.Control  isInvalid={touched.team && errors.team} onChange={handleChange} onBlur={handleBlur} type="text" placeholder="User Team" name="team" value={values.team}/>
                                <Form.Control.Feedback type="invalid">{errors.team}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="usercompany">
                            <FloatingLabel controlId="floatingCompany" label="User Company" className="mb-3 text-muted">
                                <Form.Control onChange={handleChange} type="text" placeholder="User Company" name="company" value={values.company}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="usermail">
                            <FloatingLabel controlId="floatingEmail" label="User e-mail" className="mb-3 text-muted">
                                <Form.Control isInvalid={touched.email && errors.email} onChange={handleChange} onBlur={handleBlur} type="email" placeholder="User e-mail" name="email" value={values.email}/>
                                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userphone">
                            <FloatingLabel controlId="floatingPhone" label="User Phone Number" className="mb-3 text-muted">
                                <Form.Control isInvalid={touched.phone && errors.phone} onChange={handleChange} onBlur={handleBlur} type="tel" placeholder="User Phone Numver" name="phone" value={values.phone}/>
                                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userremark">
                            <FloatingLabel controlId="floatingRemark" label="Remark" className="mb-3 text-muted">
                                <Form.Control onChange={handleChange} as="textarea" rows={3} placeholder="Remark" name="remark" value={values.remark}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>    
                    <Col sm={4}/> 
                    <Col>                
                        <Button variant="primary" type="submit" >계정생성</Button>
                    </Col>
                    <Col>                
                        <Button variant="danger" type="reset" onClick={()=>{resetForm()}} >초기화</Button>
                    </Col>     
                    <Col>                
                        <Button variant="secondary" onClick={()=>{navigate("/")}}>나가기</Button>
                    </Col>
                    <Col sm={4}/>
                </Row>
            </Form>
        
        )}
        </Formik>
        </div>
    )
}

export default LoginForm