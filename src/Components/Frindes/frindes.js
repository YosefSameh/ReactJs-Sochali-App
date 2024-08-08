import { Avatar, Badge, IconButton, Stack, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { fetchUsers } from "../../Redux-Tollkit/users-tollkit";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import LoadingCircular from "../loading/loading-Circular";
import { fetchPosts } from "../../Redux-Tollkit/posts.tollkit";
import { fetchFollow } from "../../Redux-Tollkit/follow-tollkit";
import { Bounce, toast } from "react-toastify";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
    },
    },
    '@keyframes ripple': {
    '0%': {
        transform: 'scale(.8)',
        opacity: 1,
    },
    '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
    },
    },
}));
const StyledBadge2 = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));
const FrindesFollowing = ()=> {

    const url = 'https://node-js-sochali-app.vercel.app/api/posts' 
    const token = localStorage.getItem("token")
    const idUser = localStorage.getItem("id")
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
    },[])
    if (loading) {
            return <div><LoadingCircular/></div>
    }
    if (error) {
        return toast.error(`${error}`, {
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
    if(!users){
        return  toast.error(`User Not Fount , Please Refresh Page and Try Agin`, {
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

    const user = users.find(user => user._id === idUser);


    const UnFollow = async (idFollow,postId)=>{
        

        const UrlFollow = `https://node-js-sochali-app.vercel.app/api/follow/unfollow/${idFollow}`
        const method = "post"
        await dispatch(fetchFollow({url:UrlFollow,method,config}))
        const followStatus = localStorage.getItem("followStatus")
        const toString = JSON.parse(followStatus)
        toString[postId] = false
        localStorage.setItem("followStatus",JSON.stringify(toString))

        dispatch(fetchUsers(config))
        dispatch(fetchPosts({url,config}));

        toast.success('UnFollw User  Success ', {
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
            <div>
        
        <div className="parent-4 mt-0 bg-white px-4 py-3 rounded-4">
                <h5 className="fw-bold">Friendes List</h5>
                <div className="mt-3">
                {user === undefined ? null:user.follow.map((follow)=>(
                    <div key={follow._id} className="d-flex mb-3  align-items-center">
                
            <div className="img-profile">
                <Stack direction="row" spacing={2}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar style={{width:40,height:40}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </StyledBadge>
                </Stack>
            </div>
            <div className="name-profile ms-3">
                <h4 className="mb-0 text-black-50">{follow.firstName} {follow.lastName}  </h4>
                
            </div>
            <div style={{flex:1}} className="d-flex justify-content-end">
                    <IconButton aria-label="cart">
                        <StyledBadge2 onClick={()=>UnFollow(follow._id,follow.postId)} color="secondary">
                            <PersonRemoveIcon />
                        </StyledBadge2>
                    </IconButton>
                </div>
            </div>
        ))}
                </div>
            </div>
                
            </div>
            
             
        </>
    )
}


export default  FrindesFollowing