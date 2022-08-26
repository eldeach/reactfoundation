//========================================================== React 라이브러리 import
import * as React from 'react';
import { useState } from 'react';
//========================================================== Material UI 라이브러리 import
import {Paper, Button, Stack,Slide, Divider, Modal, Typography} from '@mui/material/';
//========================================================== Slide Popup 컴포넌트 & Redux import
import { useDispatch, useSelector } from "react-redux"
import { setSlidePopup, setSldiePopupFunc } from "./../store.js"
//---------------------------------------------------------- Slide Popup Content 컴포넌트
import SP_DeleteAccount_handle from './SP_DeleteAccount_handle'
import SP_SelectAccount_store from './SP_SelectAccount_store'

//========================================================== Slide Popup config
function SlidePopup(){
  //========================================================== [Redux] Slide Popup state 접근용
  let rdx = useSelector((state) => { return state } )
  let dispatch = useDispatch();

  return(
    <Modal open={rdx.slidePopup} closeAfterTransition>
      <Slide direction="up" in={rdx.slidePopup} mountOnEnter unmountOnExit>
        <div className="slide-popup">
          <Paper style={{padding:'10px'}} elevation={4}>
            <Stack spacing={0.7}>
              <div className='content-right'>
                <Button size="small" onClick={async ()=>{
                  dispatch(setSldiePopupFunc(""))
                  dispatch(setSlidePopup(false))
                  }}>Close</Button>
              </div>
              <Divider/>
              <div style={{height:'500px', overflow:'scroll'}}>
                {
                  rdx.sldiePopupFunc == "SP_DeleteAccount_handle"? <SP_DeleteAccount_handle/>:(
                    rdx.sldiePopupFunc=="SP_SelectAccount_store_one"?<SP_SelectAccount_store multipleRow={false}/>:(
                      rdx.sldiePopupFunc=="SP_SelectAccount_store_multi"?<SP_SelectAccount_store multipleRow={true}/>:<div></div>
                    )
                  )
                }
              </div>
            </Stack>
          </Paper>  
        </div>
      </Slide> 
    </Modal>
  )
}

export default SlidePopup