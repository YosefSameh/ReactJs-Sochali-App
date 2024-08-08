import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchRigster = createAsyncThunk("rigster/fetchRigster", async (userData)=>{

    try {
        const response = await axios.post('https://node-js-sochali-app.vercel.app/api/users/rigster', userData);
        return response.data;
      } 
      catch (error) {
        return console.log(error);
      }
    }

)


const SliceRigster = createSlice({
    name:"rigster",
    initialState: {
        user: [],
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(fetchRigster.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchRigster.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(fetchRigster.fulfilled, (state, action) => {
            state.loading = false;
            state.user.push(action.payload.data) 
            console.log(action.payload,"action");
          })
        
      }
})

export default SliceRigster.reducer