import { Avatar, Badge, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, styled } from "@mui/material";
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import MicIcon from '@mui/icons-material/Mic';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../Redux-Tollkit/add-post-tollkit";
import { useState } from "react";
import { fetchPosts } from "../../Redux-Tollkit/posts.tollkit";
import Loading from "../loading/loading";
import Aleart from "../Alert/alert";
import { Bounce, toast } from "react-toastify";
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const AddPost = ()=> {

    const {error,loading,post} = useSelector((state)=>state.post)
    const dispatch = useDispatch()
    const token = localStorage.getItem("token")
    const [valueInput,setValueInput] = useState("")
    const [changeFile,setChangeFile] = useState("")

    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    if(!post){
        return  toast.error(`Post Not Fount , Please Refresh Page and Try Agin`, {
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

    

    const handelAddPost = async ()=>{
        const url = 'https://node-js-sochali-app.vercel.app/api/posts' 
        // const url = 'https://node-js-sochali-app-3.vercel.app/api/posts' 
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        const body = {
            titel:valueInput,
            imgPost:changeFile
        }
        console.log(changeFile,"changeFileeeeeeaaaaa");
        

        if (!valueInput) {
            return toast.warning('The Input Is Empty ', {
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
        
       await dispatch(addPost({body,token}))
       dispatch(fetchPosts({url,config}))
       toast.success('Add Post Success ', {
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
        setValueInput("")
        
    }
    return(
        
        <div style={{ width:"100%",maxWidth:650}}>
            <div className="parent-all px-4 py-3 rounded-4 bg-white shadow">
                <div className="d-flex align-items-center">
                    <Stack direction="row" spacing={2}>
                            <Avatar style={{width:50,height:50}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Stack>
                    <div style={{flex:1,marginLeft:20}}>
                        <input  placeholder="Whats on your mind"   onChange={(e)=>setValueInput(e.target.value)} style={{outline:"none",backgroundColor:"#eee"}} className="border-0 px-3 py-3 w-100 rounded-pill" />
                    </div>
                </div>
                <hr/>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex text-black-50" style={{cursor:"pointer"}}>
                        
                        <Button
                            component="label"
                            role={undefined}
                            tabIndex={-1}
                            startIcon={<WallpaperIcon/>}
                            className="text-black"
                            onChange={(e)=>setChangeFile(e.target.value)}
                            >
                        <p className="fw-bold ms-2 mb-0">Images</p>
                            <VisuallyHiddenInput type="file" />
                        <VisuallyHiddenInput type="file" />
                        </Button>
                    </div>
                    
                    <div className="d-flex text-black-50" >
                        <AssignmentIcon/>
                        <p className="fw-bold ms-2 mb-0">Clip</p>
                    </div>
                    <div className="d-flex text-black-50"  >
                        <MicIcon/>
                        <p className="fw-bold mb-0 ms-2 ">Aduio</p>
                    </div>
                    <div className="d-flex">
                        <Chip label="Post"  onClick={handelAddPost} className="fw-bold fs-6 bg-info  text-black" component="a" style={{width:75,height:35}}  clickable />
                    </div>
                </div>
            </div>
        </div>

    )
}



export default AddPost