import { useState } from "react";
import  "./rigster.css";
import {  Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchRigster } from "../../Redux-Tollkit/rigster-tollkit";
import LoadingProgries from "../loading/loading-Progres";
import Aleart from "../Alert/alert";
import { Bounce, toast } from "react-toastify";


const Rigster = ()=>{

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showAlert,setShowAlert] = useState(false)
  const [stateAlert,setStateAlert] = useState("success")
  const [message,setMessage] = useState("")
  const {user,loading,error} = useSelector((state)=>state.user)

  const [formData , setFormData] = useState({
    firstName:"",
    lastName:"",
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
    return <div>{error}</div>
  }

  const SudmitForm = async(e)=>{
    e.preventDefault();
    
    if(formData.email === "" || formData.password === ""|| formData.firstName === "" || formData.lastName === "" ){
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
    const responsef = await dispatch(fetchRigster(formData))
    localStorage.clear()
    console.log(responsef.payload.data.Users.token,"responser");

    localStorage.setItem("token",responsef.payload.data.Users.token )
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
          
          
          <p></p>
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