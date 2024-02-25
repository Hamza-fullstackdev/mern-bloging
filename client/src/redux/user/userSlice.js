import { createSlice} from "@reduxjs/toolkit";

const initialState={
    currentuser:null,
    loading:false,
    error:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart(state){
            state.loading=true
            state.error=null
        },
        loginSuccess(state,action){
            state.currentuser=action.payload
            state.loading=false
            state.error=null
        },
        loginFailure(state,action){
            state.error=action.payload
            state.loading=false
        },
    }
});

export const {loginStart,loginSuccess,loginFailure}=userSlice.actions;

export default userSlice.reducer;