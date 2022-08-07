import { configureStore, createSlice } from '@reduxjs/toolkit' // redux 기본 라이브러리

import storage from 'redux-persist/lib/storage'; // redux-persist 관련 라이브러리 (저장소 : 로컬 스토리지)
import {combineReducers} from "redux"; // redux-persist 관련 라이브러리 (reducer 통합)
import { persistReducer } from 'redux-persist' // redux-persist 관련 라이브러리
import thunk from 'redux-thunk' // redux-persist 관련 라이브러리


let loginUser = createSlice({
  name : 'loginUser',
  initialState : {loginStat : false, userInfo : {user_account : '', user_name : '로그인이 필요합니다.', user_auth : ["nothing"]}},
  reducers : {
      setLoginStat(state,newLoginStat){
        state.loginStat = newLoginStat.payload
      },
      setUserInfo(state,newUserInfo){
        state.userInfo = newUserInfo.payload
      },
      setLogOut(state){
        state = {loginStat : false, userInfo : {user_account : '', user_name : '로그인이 필요합니다.', user_auth : ["nothing"]}}
      }
  }
})

export let {setLoginStat, setUserInfo, setLogOut} =  loginUser.actions


//=========================================================== // redux-persist setting
const reducers = combineReducers({
  loginUser : loginUser.reducer
});
 
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ["loginUser"]
}

const persistedReducer = persistReducer(persistConfig, reducers);

//=========================================================== // export reducer
const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export default store;