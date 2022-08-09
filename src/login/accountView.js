import { useEffect, useState } from 'react';
import { Table, FloatingLabel, Button,Container,Row,Col  } from 'react-bootstrap';
import axios from 'axios';

function AccountView(){
    let [qryAccount,setQryAccount] = useState("");
    let [listData,setListData] = useState([])

  useEffect(() => {

    let data = {
        user_account : qryAccount
   };

   axios({
       method:"get",
       url:"/getaccountview",
       params:{user_account : qryAccount},
       headers:{
           'Content-Type':'application/json'
       }

   }).then((res)=>{
       console.log(res);
       setListData(res.data)
   })

    // async function getResults() {
    //     let body={
    //         id:"a"
    //     }

    //     const results = await axios('/accountview', body).then((v)=>{
    //         console.log(v.data)
    //       }).catch((err)=>console.log(err))
    //   }

  },[]);
    return(
        <div>
            <div className="tblheader">
                <h1>aaa</h1>
                <h1>aaa</h1>
                <h1>aaa</h1>
                <h1>aaa</h1>
                <h1>aaa</h1>
                <h1>aaa</h1>
                <h1>aaa</h1>
            </div>
            <div className='tbl'>
            {
                listData.length>0?<Listup listData={listData}/>:<div></div>
            }
            </div>
            <div className='tblfooter'>
                <h1>table page footer</h1>
            </div>
        </div>
    )

}

function Listup(props){
    return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                    {
                         Object.keys(props.listData[0]).map((columName,i)=>{
                            return <th key={i}>{columName}</th>   
                        })
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listData.map((oneRow,i)=>{
                            return(
                            <tr>
                                {
                                    Object.values(oneRow).map((oneValue,i)=>{
                                        return <td>{typeof(oneValue)=='string' || typeof(oneValue)=='number' ? oneValue : ''}</td> 
                                    })
                                }
                            </tr>
                            )
                        })           
                    }
                </tbody>
            </Table>
    )

}

export default AccountView