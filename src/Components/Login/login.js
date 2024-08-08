import { useDispatch, useSelector } from "react-redux";
import  "./login.css";
import {  Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { fetchLogin } from "../../Redux-Tollkit/login-tollkit";
import Loading from "../loading/loading";
import LoadingProgries from "../loading/loading-Progres";
import Aleart from "../Alert/alert";
import { Bounce, toast } from "react-toastify";


const Login = ()=>{
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,loading,error} = useSelector((state)=>state.login)
  const [showAlert,setShowAlert] = useState(false)
  const [message,setMessage] = useState("")
  const [formData , setFormData] = useState({
    email:"",
    password:""
  }) 

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
    return <div></div>
  }


  const SudmitForm = async(e)=>{
    
    e.preventDefault();



    if(formData.email === "" || formData.password === "" ){
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
    const responsef = await dispatch(fetchLogin(formData))
    localStorage.clear()

    console.log(responsef.payload,"responser");
    console.log(user,"users");
    localStorage.setItem("token",responsef.payload.data.Users.token)
    localStorage.setItem("firstName",responsef.payload.data.Users.firstName )
    localStorage.setItem("lastName",responsef.payload.data.Users.lastName )
    localStorage.setItem("id",responsef.payload.data.Users._id )
    navigate('/home')

  }

    return(
    <>
    <div className="center">
        <div className="register">
        <form onSubmit={SudmitForm}>
          <h1>Login</h1>
         
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
          
          
          <p></p>
          <div className="sudmit-center">
          <button className="sudmit">
            Login
          </button>
          </div>
        </form>
    
        
        <p className="mt-3 fs-6">You Have Create Account?<Link  to="/rigster"> Rigster</Link></p>
        
      </div>
      </div>
    </>
  
    )
}


export default Login