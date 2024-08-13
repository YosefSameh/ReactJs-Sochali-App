import { Avatar, Badge, IconButton, Stack, styled } from "@mui/material";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import './sectionLeft.css'
import FrindesFollowing from "../Frindes/frindes";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux-Tollkit/users-tollkit";
import { useEffect } from "react";
import LoadingCircular from "../loading/loading-Circular";


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
// =============
const StyledBadge2 = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    },
}));



const SectionLeft = ()=> {
    const dispatch = useDispatch()
    const idUser = localStorage.getItem("id")
    const token = localStorage.getItem("token")

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    const { users, loading, error } = useSelector(state => state.users);
    
    useEffect(() => {
        dispatch(fetchUsers(config));
    }, [dispatch]);



    if (error) {
        return <div>Error: {error}</div>;
        }

    const user = users.find(user => user._id === idUser);

    if (!user) {
        return
        
    }

 
    
    return(
        // display: "-webkit-box"
        <div  style={{ width:"100%",maxWidth:400 }} className="sectionLeft shadow">
            <div className="parent-all bg-white px-4 py-3 rounded-4">
                <div className="parent-1 mb-3 justify-content-between align-items-center">
                    <Link style={{textDecoration:"none", color:"black"}} to="/profile">
                        <div className="d-flex  align-items-center" style={{cursor:"pointer"}}>
                            <div className="img-profile">
                                <Stack direction="row" spacing={2}>
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar style={{width:60,height:60}} alt="Remy Sharp" src={user.imgProfile} />
                                    {/* src="/static/images/avatar/1.jpg" */}
                                </StyledBadge>
                                </Stack>
                            </div>
                            <div className="name-profile ms-4">
                                <h3 className="mb-0">{user.firstName} {user.lastName}</h3>
                                <p className="mb-0 text-black-50"><span className="fw-bold text-black" ></span>{user.follow.length} Frindes</p>
                            </div>
                        </div>
                    </Link>
                </div>
                <hr/>
                {/* informetion to profile-person */}
                <div className="parent-2 mb-3">
                    <div className="d-flex align-items-center mb-2">
                        <LocationOnIcon style={{fontSize:30}}/>
                        <p className="fw-bold mb-0 text-black-50">Nasr City</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <ShoppingBagIcon style={{fontSize:30}}/>
                        <p className="fw-bold mb-0 text-black-50">Degenerate</p>
                    </div>
                </div>
                <hr/>
                {/* <div className="parent-3 mb-3">
                    <h5 className="mb-3">Social Profile</h5>
                    <div className="d-flex  align-items-center mb-3">
                        <XIcon style={{fontSize:30}}/>
                        <p className="fw-bold mb-0 ms-1 text-black-50">X</p>
                        <div style={{flex:1}} className="d-flex justify-content-end">
                            <IconButton aria-label="cart">
                                <StyledBadge2 color="secondary">
                                    <EditIcon style={{cursor:"pointer"}} />
                                </StyledBadge2>
                            </IconButton>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <LinkedInIcon style={{fontSize:30}}/>
                        <p className="fw-bold mb-0 ms-1 text-black-50">LinkedIn</p>
                        <div style={{flex:1,cursor:"pointer"}} className="d-flex justify-content-end">
                            <IconButton aria-label="cart">
                                <StyledBadge2 color="secondary">
                                    <EditIcon style={{cursor:"pointer"}} />
                                </StyledBadge2>
                            </IconButton>
                        </div>
                    </div>
                    
                </div> */}
                
            </div>
                {/* Freinds */}
                <FrindesFollowing/>
                
        </div>
    )
}


export default SectionLeft