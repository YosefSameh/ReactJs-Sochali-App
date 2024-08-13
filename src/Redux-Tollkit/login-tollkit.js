import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchLogin = createAsyncThunk("login/fetchLogin", async (userData)=>{

    try {
        const response = await axios.post('https://node-js-sochali-app.vercel.app/api/users/login', userData);
        return response.data;
      } 
      catch (error) {
        return console.log(error,"error");
      }
    }

)


const SliceLogin = createSlice({
    name:"login",
    initialState: {
        user: [],
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(fetchLogin.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchLogin.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(fetchLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user.push(action.payload.data) 
            console.log(action.payload,"action");
          })
        
      }
})

export default SliceLogin.reducer