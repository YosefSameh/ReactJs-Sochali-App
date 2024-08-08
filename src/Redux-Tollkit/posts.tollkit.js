import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchPosts = createAsyncThunk("posts/fetchPosts", async ({ url, config })=>{

  console.log(config,"config",url,"url");
    try {
        const response = await axios.get(url,config);
        return response.data
      } 
      catch (error) {
        return error 
      }
    }

)


const SlicePosts = createSlice({
    name:"posts",
    initialState: {
        posts: [],
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(fetchPosts.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchPosts.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload.data.posts;
            // state.posts = action.payload;
            console.log(action.payload,"action")
          })
        
      }
})

export default SlicePosts.reducer