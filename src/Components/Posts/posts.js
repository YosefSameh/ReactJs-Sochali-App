import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { styled } from '@mui/material/styles';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import { Button, Divider, IconButton, Menu, MenuItem, Slide, TextField, alpha } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../Redux-Tollkit/posts.tollkit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../Redux-Tollkit/users-tollkit';
import Loading from '../loading/loading';
import Aleart from '../Alert/alert';
import { fetchComments } from '../../Redux-Tollkit/comment-tollkit';
import { fetchSave } from '../../Redux-Tollkit/save-tollkit';
import { fetchFollow } from '../../Redux-Tollkit/follow-tollkit';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingProgries from '../loading/loading-Progres';


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));


const Posts = (props) => {
    const { error, loading, posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const url = 'https://node-js-sochali-app.vercel.app/api/posts' 
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    useEffect(() => {
        
        if(props.url === undefined){

            dispatch(fetchPosts({url,config}))
        }else{
            
            dispatch(fetchPosts({ url: props.url, config:props.token }))

        }

        
    
}, [dispatch]);

// Saved Stateus In LoclaStorage
useEffect(() => {
   const savedFollowStatus = JSON.parse(localStorage.getItem('followStatus'));
   if (savedFollowStatus) {
       setFollowStatus(savedFollowStatus);
   }
   const savedSaveStatus = JSON.parse(localStorage.getItem('SaveStatus'));
   if (savedSaveStatus) {
       setSave(savedSaveStatus);
   }
}, [posts]);
// Saved Stateus In LoclaStorage
    

    // Consting
    const idUser = localStorage.getItem("id");
    let method = "post"
    // Consting


    
    // opoen And Close Option

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event,postId) => {
        setAnchorEl(event.currentTarget);
            setSelectedPostId(postId);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        // opoen And Close Option
        
 
        
        // Like 
        const [color, setColor] = useState(false);

    const colorFavorite = (id) => {
        setColor((prev) => ({
            ...prev,
            [id]: true
        }));
    };
    
    const unColorFavorite = (id) => {
        setColor((prev) => ({
            ...prev,
            [id]: false
        }));
    };
    // Like 
    

    
    // follow and UnFollow
    const [followStatus, setFollowStatus] = useState(false); 
    
    const {follow, loadingF,errorF} = useSelector(state=> state.follow)
    

    const handelFollow = async (id) => {
        setFollowStatus((prev) => {
            const updatedStatus = {
                ...prev,
                [id]: true
            };
            localStorage.setItem('followStatus', JSON.stringify(updatedStatus));
            return updatedStatus;
        });
        const UrlFollow = `https://node-js-sochali-app.vercel.app/api/follow/${id}`
        
        if(errorF){
            return  toast.error(`Follow Not Fount ,${errorF}, Please Refresh Page and Try Agin`, {
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
        await dispatch(fetchFollow({url:UrlFollow,method,config}))
        dispatch(fetchUsers(config))
        
        toast.success('Follow User Success ', {
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
        
    };
    
   
    // follow and UnFollow



    // Save And UnSave
    const [save, setSave] = useState(false);
    const stateSave = useSelector(state => state.save)
    const Save = async (id) => {
        setSave((prev) => {
            const updatedStatus = {
                ...prev,
                [id]: true
            };
            localStorage.setItem('SaveStatus', JSON.stringify(updatedStatus));
            return updatedStatus;
        });

        
        const urlSave = `https://node-js-sochali-app.vercel.app/api/users/${id}/save`;
        const method = "post";

        if(stateSave.error){
            return  toast.error(`${stateSave.error}, Please Refresh Page and Try Agin`, {
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

        await dispatch(fetchSave({ url: urlSave, method, config }));

        if (props.url === undefined) {
            dispatch(fetchPosts({url,config}))
        }
        toast.success('Save Post Success ', {
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
        
        };
      // Save And UnSave


    // Comments

    const [openDeleteComment, setOpenDeleteComment] = useState(false);
    const [idCommentAndPost , setIdCommentAndPost] = useState({idComment:'', idPost:""})
    const [openComments, setOpenComments] = useState({});
    const [valueComment , setValueComment] = useState("")



    const toggleComments = (postId) => {
        setOpenComments(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleClickOpenDeleteComment = (idComment , idPost) => {
        setOpenDeleteComment(true);

        setIdCommentAndPost({idComment:idComment,idPost:idPost})
    };
  
    const handleCloseDeleteComment =  () => {
      setOpenDeleteComment(false);
    };
    

    const handelAddComment =async (id)=>{

        const body = {
            text:valueComment
        }

        if (valueComment === "" ) {
            return toast.warning('Input Comment Is Empty', {
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
        }else{
            const urlComment = `https://node-js-sochali-app.vercel.app/api/posts/${id}/comments`
            method = "post"
    
            await dispatch(fetchComments({url:urlComment,method,body,config}))
    
            toast.success(' Add Comment Success !', {
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
                setValueComment("")
            if (props.url === undefined) {
                dispatch(fetchPosts({url,config}))
            }
        }

       


    }


    const handelDeleteComment = async ()=>{

        const urlComment = `https://node-js-sochali-app.vercel.app/api/posts/${idCommentAndPost.idPost}/comments/${idCommentAndPost.idComment}`
        method = "delete"
        await dispatch(fetchComments({url:urlComment,method,config}))
        handleCloseDeleteComment()
        // setShowAlert(true)
        // setMessage("Comment Delete Success")

        if (props.url === undefined) {
            
            dispatch(fetchPosts({url,config}))
        }
        toast.success(' Delete Comment Success !', {
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

    // Comments


            
    // edite Post
    const [openEdit, setOpenEdit] = useState(false);
    const [inputChange, setInputChange] = useState(null);

    
    const handleClickOpenEdit = () => {
        setOpenEdit(true);
        handleClose(); 
    };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    handleClose(); 
  };

    const handelEdite = (id)=>{
        const body = {
            titel:inputChange
        }

        if (!inputChange) {
            return toast.warning('Input Edite Is Empty', {
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
        
    
        axios.patch(`https://node-js-sochali-app.vercel.app/api/posts/${id}`,body, config)
            .then((response) => {
                console.log(response , "newf Responsef");
                
                handleCloseA();
                if (props.url === undefined) {
                    
                    dispatch(fetchPosts({url,config}))
                }
                toast.success(' Edit Post Success', {
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
                    setInputChange("")
            })
            .catch((error) => {
                console.log(error, "error");
                toast.error(`${error}`, {
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
                
            });
        handleCloseA();
    }
    // edite Post
    
    // deltePos
    const [openA, setOpenA] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    const handleClickOpen = () => {
        
        setOpenA(true);
        handleClose(); 
    }

    const handleCloseA = () => {
        setOpenA(false);
      };
    
   
      const SudmitDeletePost = (id) => {
    
        axios.delete(`https://node-js-sochali-app.vercel.app/api/posts/${id}`, config)
            .then((response) => {
                if (props.url === undefined) {
                    
                    dispatch(fetchPosts({url,config}))
                }
                
                toast.success('Delete Post Success !', {
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
            })
            .catch((error) => {
                console.log(error, "error");
                toast.error(`${error}`, {
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
            });
        handleCloseA();
    };
    // deltePos



    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!posts || posts.length === 0) {
        return <div>No posts available</div>;
    }

    return (
        <>
        
        
{posts.map((ele,index) => (
    <>
    <div key={ele._id} className='rounded' style={{ display: "flex", justifyContent: `start`, alignItems: "center" }}>
        <Card sx={{ maxWidth: 650, paddingX: 3, paddingY: 2, width: 700, marginTop: 5 }}>
            <div className='d-flex justify-content-between '>
                <div className='d-flex'>
                    
                    <Link to={`/profile/${ele.user_id}`}><Avatar alt="Remy Sharp" src="" /></Link>

                    <div className='ms-4'>
                        <p className='m-0'>{ele.firstName}{ele.lastName}</p>
                        <p>{ele.createAt}</p>
                    </div>
                    
                    {ele.user_id === idUser ? null : 
                    index === posts.findIndex(post => post.user_id === ele.user_id) && (
                    <div className='ms-4 d-flex align-items-start  '>
                    {followStatus[ele._id] === false || followStatus[ele._id] === undefined ? 
                        <PersonAddIcon onClick={() => handelFollow(ele._id)} style={{ transition: "0.4s",cursor:"pointer" }} variant="text">Follow</PersonAddIcon>
                        :
                        
                        <h6  style={{ transition: "0.4s" }} variant="text">Following</h6>

                    }
                    </div>
                    
                    )}
                </div>
                {ele.user_id === idUser ?
                <div>
                    
                <Button
                        id={`demo-customized-button-${ele._id}`}
                        aria-controls={anchorEl ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={anchorEl ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={(event) => handleClick(event, ele._id)}
                        endIcon={<KeyboardArrowDownIcon />}
                    >
                        Options
                    </Button>
                    <StyledMenu
                        id={`demo-customized-menu-${ele._id}`}
                        MenuListProps={{
                            'aria-labelledby': `demo-customized-button-${ele._id}`,
                        }}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClickOpenEdit} disableRipple>
                            <EditIcon />
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleClickOpen} disableRipple>
                            <DeleteIcon />
                            Delete
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={handleClose} disableRipple>
                            <MoreHorizIcon />
                            More
                        </MenuItem>
                    </StyledMenu>
                </div>
                :null}
                
            </div>
                {ele.imgPost === null ?
                <CardContent>
                <Typography variant="body1" color="">
                    {ele.titel}
                </Typography>
            </CardContent>
                :
               <div>
                 <CardContent>
                <Typography variant="body1" color="">
                    {ele.titel}
                </Typography>
            </CardContent>
            <CardMedia
            component="img"
            height="350"
            image={`http://node-js-sochali-app.vercel.app${ele.imgPost}`}
            alt="image is not available"
        />
               </div>
                }
            
            <div className='d-flex align-items-center justify-content-between' style={{ transition: "0.5s" }}>
                <div className='d-flex align-items-center' style={{ cursor: "pointer" }}>
                    <div  style={{ cursor: "pointer" }}>
                        {save[ele._id] === false || save[ele._id] === undefined?
                            <BookmarkAddIcon onClick={() => Save(ele._id)} />
                            :
                            <BookmarkAddIcon  />
                        }
                        
                    </div>
                    <div onClick={colorFavorite} className='ms-3'>
                    {color[ele._id] === false || color[ele._id] === undefined?
                            <FavoriteBorderIcon  onClick={() => colorFavorite(ele._id)} style={{ color: "black", transition: ".2s" }} />
                            :
                            <FavoriteBorderIcon  onClick={() => unColorFavorite(ele._id)} style={{ color: "red", transition: ".2s" }} />
                        }

                    </div>
                </div>
                <div className='text-start ms-3 mt-2'>
                    <Button style={{ textAlign: "center", transition: ".4s" }} className='d-flex bg-info text-black justify-content-center align-items-center' onClick={() => toggleComments(ele._id)} variant="contained">
                        <ChatBubbleOutlineRoundedIcon />
                        <span className='ps-1'>{ele.comments.length}</span>
                    </Button>
                </div>
            </div>
            {openComments[ele._id] && (
                <>
                    <div className="shadow mt-4 d-flex justify-content-center align-items-center rounded">
                        <div className="py-1 h-50 px-2" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", borderRadius: 10, width: "100%" }}>
                            <div className="ms-1 d-flex justify-content-center align-items-center">
                                <Avatar alt="User Avatar" src="" sx={{ width: 45, height: 45 }} />
                                <input placeholder="Add Comment" onChange={(e)=>setValueComment(e.target.value)} style={{ marginLeft: 10, border: 0, width: "100%", height: "65px", outline: "none" }} />
                            </div>
                            <div>
                                <Button onClick={()=>handelAddComment(ele._id)} variant="contained" className="bg-info text-black" endIcon={<SendIcon />}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div> 
                        {ele.comments.map((comment)=>(                            
                            <div key={comment._id}  className='d-flex align-items-center'>
                            <div>
                                <Avatar alt="User Avatar" src="" sx={{ width: 30, height: 30 }} />
                            </div>
                            <div className='ms-2 mt-5 bg-light px-3 rounded d-flex justify-content-center align-items-center flex-column'>
                                <div className='d-flex w-100'>
                                <p className='m-0' style={{ width: "100%", textAlign: "start" }}>{comment.firstName} {comment.lastName}</p>
                                {idUser === comment.user_id ?
                                    <IconButton onClick={()=>handleClickOpenDeleteComment(comment._id,ele._id)} aria-label="delete" size="small">
                                    <DeleteIcon fontSize="medium" />
                                  </IconButton>
                                :null}
                                </div>
                                <p className='w-100'>{comment.text}</p>
                            </div>
                        </div>
                         ))} 
                    </div>
                    
                </>
            )}
        </Card>
    </div>

    </>
        
    
))}


{/* Alerat Delete */}
<Dialog
        open={openA}
        onClose={handleCloseA}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure Want to Delete This Post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseA}>No</Button>
          <Button   color='error' variant="contained"onClick={() => SudmitDeletePost(selectedPostId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    {/* Alerat Delete */}
    
    {/* Form Edit */}
    <Dialog
        open={openEdit}
        
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseEdit();
          },
        }}
      >
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Shouer You Want To Edit This Post
          </DialogContentText>
          <TextField
          onChange={(e)=>setInputChange(e.target.value)}
            autoFocus
            required
            margin="dense"
            id="name"
            name="text"
            label="titel"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button type="submit"onClick={() => handelEdite(selectedPostId)}  variant='contained'>Edit</Button>
        </DialogActions>
      </Dialog>
    {/* Form Edit */}

    {/* Alerat Delete Comments */}
    <Dialog
        open={openDeleteComment}
        onClose={handleCloseDeleteComment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alert"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure Want to Delete This Comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteComment}>No</Button>
          <Button color='error' variant="contained" onClick={handelDeleteComment} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
{/* Alerat Delete Comments */}

</>
);
}

export default Posts;
