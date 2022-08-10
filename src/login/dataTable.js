import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function DataTable() {

    // let columns = [
    //     { field: 'id', headerName: 'ID', width: 70 },
    //     { field: 'firstName', headerName: 'First name', width: 130 },
    //     { field: 'lastName', headerName: 'Last name', width: 130 },
    //     {
    //         field: 'age',
    //         headerName: 'Age',
    //         type: 'number',
    //         width: 90,
    //     },
    //     {
    //         field: 'fullName',
    //         headerName: 'Full name',
    //         description: 'This column has a value getter and is not sortable.',
    //         sortable: false,
    //         width: 160,
    //         valueGetter: (params) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    //     },
    // ];

    // let rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //   ];

    let columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'user_account', headerName: '계정', width: 70 },
      { field: 'user_name', headerName: '사용자명', width: 70 },
      { field: 'user_team', headerName: '부서', width: 70 },
      { field: 'user_company', headerName: '회사', width: 70 },
      { field: 'user_position', headerName: '직책', width: 70 },
      { field: 'user_phone', headerName: '전화번호', width: 70 },
      { field: 'user_email', headerName: '이메일', width: 70 },
      { field: 'remark', headerName: '비고', width: 70 },
      { field: 'insert_by', headerName: '입력계정', width: 70 },
      { field: 'insert_datetime', headerName: '입력일시', width: 70 },
      { field: 'update_by', headerName: '수정계정', width: 70 },
      { field: 'update_datetime', headerName: '수정일시', width: 70 },
    ];
  
  let rows2 = [
    {user_account:"admin"}
  ];
  let [cols,setCols] = useState([]);
  let [rows,setRows] = useState([]);
  
    
    let [qryAccount,setQryAccount] = useState("");

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
      let tempCol=[]
      let tempRow =[]
      console.log(res.data)

       Object.keys(res.data[0]).map((columName,i)=>{
        tempCol.push({field:columName,headerName:`${columName}`,width:(columName.length*10)})
       })
       console.log(tempCol)
       setCols(tempCol)

        res.data.map((oneRow,i)=>{
            let tempObjs = oneRow
            tempObjs["id"]=(i+1)
            tempRow.push(tempObjs)
        })
        setRows(tempRow) 
    // })
        
       
   })
  },[]);


  return (
    <div className="MaterialTable" style={{ height: 400, width: '100%'}}>
      <DataGrid
        rows={rows}
        columns={cols}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
