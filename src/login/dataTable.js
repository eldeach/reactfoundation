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
    ];
  
  let rows = [

  ];
  
    
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

       Object.keys(res.data[0]).map((columName,i)=>{
        console.log({id:`${columName}`,headerName:`${columName}`,width:"30px"})
        columns.push({id:`${columName}`,headerName:`${columName}`,width:"30px"})

        res.data.map((oneRow,i)=>{
            console.log(oneRow)
            rows.push(oneRow)
        }) 
    })

       
   })
  },[]);


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
