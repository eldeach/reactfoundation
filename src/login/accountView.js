import { useState } from 'react';
import { Table, FloatingLabel, Button,Container,Row,Col  } from 'react-bootstrap';

function AccountView(){
    let [tableHeight,setTableHeight] = useState(700);

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
            <div className="tbl" style={{height:`${tableHeight}px`}}>
                <Table size="sm" striped bordered hover>
                    <thead style ={{backgroundColor:"white",position:"fixed"}}>
                        <tr className="tableFixHead">
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                        <td>1</td>
                            <td>a</td>
                            <td>b</td>
                            <td>c</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <div className='tblfooter'>
                <h1>table page footer</h1>
            </div>
        </div>
    )

}

export default AccountView