import { useState } from "react";
import  "./rigster.css";
import {  Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchRigster } from "../../Redux-Tollkit/rigster-tollkit";
import LoadingProgries from "../loading/loading-Progres";
import WallpaperIcon from '@mui/icons-material/Wallpaper';  
import { Bounce, toast } from "react-toastify";
import { Button, styled } from "@mui/material";
import { UploadFiles } from "../Upload/uploadfile";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Rigster = ()=>{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [changeFile,setChangeFile] = useState("") 
  const {user,loading,error} = useSelector((state)=>state.user)

  const [formData , setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    imgProfile:""
  }) 

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChangeFile(file);
      // setFormData({
      //   ...formData,
      //   imgProfile: file.name
      // });
    }
  };
  
  const ChangeInput = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (loading) {
    return <div><LoadingProgries/></div>
  }
  if (error) {
    return <div>{error}</div>
  }

  // const SudmitForm = async(e)=>{
  //   e.preventDefault();
  //   console.log(changeFile,"changeFile")
    
  //   // console.log(formData,"formdtat")
  //   const image  = await UploadFiles(changeFile)
  //       console.log(image,'imgage');
    
  //       setFormData({
  //         ...formData,
  //         imgProfile: image.url
  //       });
  //       console.log(formData.imgProfile,"");
        
  //   if(formData.email === "" || formData.password === ""|| formData.firstName === "" || formData.lastName === "" ){
  //     return  toast.error(`Form Is Emtey`, {
  //     position: "top-right",
  //     autoClose: 3500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     transition: Bounce,
  //     });
  // }
  //   const responsef = await dispatch(fetchRigster(formData))
  //   localStorage.clear()
  //   console.log(responsef.payload.data.Users.token,"responser");

  //   localStorage.setItem("token",responsef.payload.data.Users.token )
  //   localStorage.setItem("firstName",responsef.payload.data.Users.firstName )
  //   localStorage.setItem("lastName",responsef.payload.data.Users.lastName )
  //   localStorage.setItem("id",responsef.payload.data.Users._id )
  //   localStorage.setItem("isLoggedIn",true)
  //   navigate('/home')

  // }
  const SudmitForm = async(e)=>{
    e.preventDefault();

    // رفع الصورة قبل تحديث formData
    const image = await UploadFiles(changeFile);

    // تحديث formData بعد الحصول على رابط الصورة
    const updatedFormData = {
        ...formData,
        imgProfile: image.url
    };

    // تحقق من أن الحقول ليست فارغة
    if(updatedFormData.imgProfile === "" || updatedFormData.email === "" || updatedFormData.password === "" || updatedFormData.firstName === "" || updatedFormData.lastName === "" ){
      return  toast.error(`Form Is Emtey`, {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    // إرسال البيانات المحدثة إلى السيرفر
    const responsef = await dispatch(fetchRigster(updatedFormData));
    localStorage.clear();

    // تخزين المعلومات في localStorage
    localStorage.setItem("token", responsef.payload.data.Users.token);
    localStorage.setItem("firstName", responsef.payload.data.Users.firstName);
    localStorage.setItem("lastName", responsef.payload.data.Users.lastName);
    localStorage.setItem("id", responsef.payload.data.Users._id);
    localStorage.setItem("isLoggedIn", true);

    navigate('/home');
}


    return(
    <>
    <div className="center">
        <div className="register">
        <form onSubmit={SudmitForm}>
          <h1>Create your account</h1>
          <input
            type="text"
           name="firstName"
            placeholder="First Name"
            value={formData.firstName}
          onChange={ChangeInput}
    
          />
          
          <input
            type="text"
            name="lastName"
            id="lname"
            placeholder="Last Name"
            value={formData.lastName}
          onChange={ChangeInput}
          />
          
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
          onChange={ChangeInput}
           
          />
          
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
          onChange={ChangeInput}
           
          />
          {/* <div className="d-flex justify-content-center align-items-center text-black-50" style={{cursor:"pointer"}}>
                        
                        <Button
                            component="label"
                            role={undefined}
                            tabIndex={-1}
                            startIcon={<WallpaperIcon/>}
                            className="text-black"
                            onChange={(e)=>setChangeFile(e.target.files[0].name)}
                            
                            >
                        <p className="fw-bold ms-2 mb-0">imgae-Profile</p>
                            <VisuallyHiddenInput type="file" />
                        <VisuallyHiddenInput type="file" />
                        </Button>
                    </div> */}
                     <div className="d-flex justify-content-center align-items-center text-black-50" style={{cursor:"pointer"}}>
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={<WallpaperIcon/>}
                className="text-black"
              >
                <p className="fw-bold ms-2 mb-0">Image Profile</p>
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </div>
          
          
          <div className="sudmit-center">
          <button  className="sudmit">
            Register
          </button>
          </div>
        </form>
    
        <p className="mt-3 fs-6">Already registered?<Link  to="/login"> Login</Link></p>
      </div>
      </div>
    </>
  
    )
}


export default Rigster