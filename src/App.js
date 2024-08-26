
import Rigster from './Components/Rigster/rigster';
import Login from './Components/Login/login';
import {  Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Nav from './Components/Nav/nav';
import Home from "./Components/Home/home";
import ProfilePage from './Components/Profile/profil';
import Save from './Components/Saved/save';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';


function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
        
        if (location.pathname !== '/' && location.pathname !== '/login') {
            navigate('/');
        }
    } else {

        if (location.pathname === '/' || location.pathname === '/login') {
            navigate('/home');
        }
    }
}, [token, location.pathname, navigate]);

  return (

      <div className="App">

      <Nav/>

      <ToastContainer
position="top-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
limit={2}
theme="light"

/>


 <Routes>
    <Route path="/" element={<Rigster/>} /> 
    <Route path="home" element={<Home/>} /> 
    <Route path="login" element={<Login/>} /> 
    <Route path="rigster" element={<Rigster/>} /> 
    <Route path="profile/:userId" element={<ProfilePage/>} /> 
    <Route path="profile" element={<ProfilePage/>} /> 
    <Route path="saved" element={<Save/>} />  
    </Routes> 

    
        
    </div>
  
  );
}

export default App;
