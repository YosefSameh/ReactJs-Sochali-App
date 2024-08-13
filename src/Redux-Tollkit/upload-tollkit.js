import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const Upload = createAsyncThunk("upload/Upload", async ({url,formData})=>{

    
    console.log(url,formData);
    
        
        const response = await fetch(url,{
            method:"post",
            body:formData
        })
        const responseData = await response.json()
        return responseData
           
      
    }

)


const SliceUpload = createSlice({
    name:"upload",
    initialState: {
        file: "",
        loading: false,
        error: null,
      },
      extraReducers:(builder)=>{
        builder.addCase(Upload.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        builder.addCase(Upload.rejected, (state,action)=>{
            state.loading = false
            state.error = action.payload
        })
        .addCase(Upload.fulfilled, (state, action) => {
            state.loading = false;
            state.file = action.payload.url;
            console.log(action.payload,"actionUPload")
          })
        
      }
})

export default SliceUpload.reducer