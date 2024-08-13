import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchComments = createAsyncThunk("comment/fetchComments", async ( { url, method, body, config } )=>{

    try {
        const response = await  axios({url,method,data:body, ...config})
        return response.data
      } 
      catch (error) {
        return error 
      }
    }

)


const SliceComment = createSlice({
    name:"comment",
    initialState: {
        comment: [],
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(fetchComments.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchComments.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comment = action.payload;
            console.log(action.payload,"actionComments")
          })
        
      }
})

export default SliceComment.reducer