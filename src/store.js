import { configureStore, createSlice } from '@reduxjs/toolkit' // redux 기본 라이브러리


let slidePopup = createSlice({
  name : 'slidePopup',
  initialState:false,
  reducers:{
    setSlidePopup(state,newSet){
      return state = newSet.payload
    }
  }
})

let sldiePopupFunc=createSlice({
  name:'sldiePopupFunc',
  initialState:"",
  reducers:{
    setSldiePopupFunc(state,newFunc){
      return state = newFunc.payload
    }
  }
})

let SP_DeleteAccount_handle = createSlice({
  name : 'SP_DeleteAccount_handle',
  initialState : {},
  reducers:{
    setSP_DeleteAccount_handle(state,targetRow){
      return state = targetRow.payload
    }
  }
})

let SP_SelectAccount_store_one =  createSlice({
  name : 'SP_DeleteAccount_handle',
  initialState : {},
  reducers:{
    setSP_SelectAccount_store_one(state,targetRow){
      return state = targetRow.payload
    }
  }
})

let sel_tb_user = createSlice({
  name : 'tb_user_sel',
  initialState : {},
  reducers:{
    setSel_tb_user(state,targetRow){
      return state = targetRow.payload
    }
  }
})


export let {setSlidePopup} = slidePopup.actions
export let {setSldiePopupFunc} = sldiePopupFunc.actions
export let {setSP_DeleteAccount_handle} = SP_DeleteAccount_handle.actions
export let {setSP_SelectAccount_store_one}=SP_SelectAccount_store_one.actions
export let {setSel_tb_user}=sel_tb_user.actions



export default configureStore({
  reducer: {
    slidePopup : slidePopup.reducer,
    sldiePopupFunc : sldiePopupFunc.reducer,
    SP_DeleteAccount_handle : SP_DeleteAccount_handle.reducer,
    SP_SelectAccount_store_one:SP_SelectAccount_store_one.reducer,
    sel_tb_user:sel_tb_user.reducer
  }
}) 