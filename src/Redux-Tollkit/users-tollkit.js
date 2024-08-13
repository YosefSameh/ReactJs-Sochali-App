import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUsers = createAsyncThunk("users/fetchUsers" , async (config)=>{

    try {
        const response = await axios.get("https://node-js-sochali-app.vercel.app/api/users" , config);
        return response.data
    } 
    catch (error) {
        console.log(error,"error");
        return error 
    }
}


)    



const SliceUsers = createSlice({
    name:"users",
    initialState: {
        users: [],
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchUsers.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload.data.Users;
            console.log(action.payload,"action")
          })
        
      }
})

export default SliceUsers.reducer