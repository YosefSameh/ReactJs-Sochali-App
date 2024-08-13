import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../Redux-Tollkit/users-tollkit';
import Loading from '../loading/loading';
import Aleart from '../Alert/alert';
import { fetchSave } from '../../Redux-Tollkit/save-tollkit';
import { Bounce, toast } from 'react-toastify';
import LoadingCircular from '../loading/loading-Circular';


export default function Save() {


const idUser = localStorage.getItem("id")
const token = localStorage.getItem("token")
const {users,loading, error} = useSelector(state => state.users)
const dispatch = useDispatch()
const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};
    useEffect(()=>{
        dispatch(fetchUsers(config))
    },[dispatch])

    if (loading) {
      return <div><Loading/></div>
    }
    if (error) {
      return <div>{error}</div>
    }
    if (!users) {
      return <div><LoadingCircular/></div>
    }
    
    const user = users.find(user => user._id === idUser);
    console.log(user,"userNwe");


const UnSavePost = async (idSave,postId)=>{
    
    
  const urlUnSave = `https://node-js-sochali-app.vercel.app/api/users/${idSave}/unsave`;
  const method = "post";
  await dispatch(fetchSave({ url: urlUnSave, method, config }));
  

  const statusSaved = localStorage.getItem("SaveStatus");

    if (statusSaved) {
        const statusObject = JSON.parse(statusSaved);

        statusObject[postId] = false;

        localStorage.setItem("SaveStatus", JSON.stringify(statusObject));
    } else {
        console.error("SaveStatus not found in localStorage");
    }

  dispatch(fetchUsers(config))
  toast.success('Un Saved Post Success ', {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });

} 


  return (
<>
    {user && user.saved.length === 0 ?
     <h4 className='d-flex justify-content-center ' >No Posts Saved </h4>
      : user && user.saved.map((save)=>(
        <div className='d-flex w-100 mt-5 justify-content-center'>
        <Card sx={{ maxWidth: 550 , width:"100%", marginBottom:4}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={save.imgProfile} />
              
          }
          
          title={`${save.firstName} ${save.lastName}`} 
          subheader={save.createAt}
        />
        <CardMedia
            component="img"
            height="350"
            image={save.img}
            alt="image is not available"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {save.titel}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton  onClick={()=>UnSavePost(save._id,save.postId)} aria-label="Remove This Post">
            <BookmarkRemoveIcon  />
          </IconButton>
        
        </CardActions>
        
      </Card>
      </div>
    ))}
    
    </>
  );
}