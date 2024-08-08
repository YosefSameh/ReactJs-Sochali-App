import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addPost = createAsyncThunk("add/addPost", async ({body,token})=>{
    console.log(token,"token");
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    try {
        console.log(config,"token2");
        
        const response = await axios.post("https://node-js-sochali-app-3.vercel.app/api/posts",body,config);
        // const response = await axios.post("https://node-js-sochali-app.vercel.app/api/posts",body,config);
        return response.data
      }     
      catch (error) {
        return console.log(error,"error");
      }
    }

)


const SliceAddPost = createSlice({
    name:"add",
    initialState: {
        post: [],
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(addPost.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(addPost.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(addPost.fulfilled, (state, action) => {
            state.loading = false;
            state.post = action.payload;
            console.log(action.payload,"action")
          })
        
      }
})

export default SliceAddPost.reducer