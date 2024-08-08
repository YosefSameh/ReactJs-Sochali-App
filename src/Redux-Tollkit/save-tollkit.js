import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchSave = createAsyncThunk("save/fetchSave", async ({ url, method, config })=>{
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


const SliceSave = createSlice({
    name:"save",
    initialState: {
        save: [],
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(fetchSave.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchSave.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(fetchSave.fulfilled, (state, action) => {
            state.loading = false;
            state.save = action.payload;
            console.log(action.payload,"actionSave")
          })
        
      }
})

export default SliceSave.reducer