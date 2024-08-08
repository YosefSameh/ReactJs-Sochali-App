import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchFollow = createAsyncThunk("follow/fetchFollow", async ({ url, method, config })=>{
    console.log();
    
    try {
        const response = await axios({ url, method, ...config });
        return response.data;
      } 
      catch (error) {
        return error 
      }
    }

)


const SliceFollow= createSlice({
    name:"follow",
    initialState: {
        follow: [],
        loadingF: false,
        errorF: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(fetchFollow.pending, (state)=>{
            state.loadingF = true
            state.errorF = null
        })
        builder.addCase(fetchFollow.rejected, (state,action)=>{
            state.loadingF = false
            state.errorF = action.payload
        })
        .addCase(fetchFollow.fulfilled, (state, action) => {
            state.loadingF = false;
            state.follow = action.payload;
            console.log(action.payload,"actionFollow")
          })
        
      }
})

export default SliceFollow.reducer