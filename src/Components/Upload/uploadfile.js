import { useDispatch } from "react-redux"

const url = `https://api.cloudinary.com/v1_1/dgvbgfwn9/auto/upload`


export const UploadFiles = async(file)=>{
    const formData = new FormData()
    formData.append("file",file)
    formData.append("upload_preset",'tn53923p')


    
    const response = await fetch(url,{
        method:"post",
        body:formData
    })
    const responseData = await response.json()
    console.log(responseData,"responseData");
    
    return responseData
} 