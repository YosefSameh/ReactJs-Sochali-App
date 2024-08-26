
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux-Tollkit/users-tollkit';
import LoadingCircular from '../loading/loading-Circular';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));




const Nav = ()=>{
    const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const idUser = localStorage.getItem("id")
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")

  useEffect(() => {
    dispatch(fetchUsers());
}, [dispatch]);

const { users,loading } = useSelector(state => state.users);

const user = users.find(user => user._id === idUser);

// if (!users) {
//   return <div><lo</div>
// }
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handelLogOut = ()=>{
    handleMenuClose()
    localStorage.clear()
    window.location.href = "/login";
  }

  const menuId = 'primary-search-account-menu';
const renderMenu = (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={menuId}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <Link style={{textDecoration:"none",color:"black"}} to="/profile"><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
    <Link style={{textDecoration:"none",color:"black"}} to="/saved"><MenuItem onClick={handleMenuClose}>SavedPosts</MenuItem></Link>
    <MenuItem onClick={handelLogOut}>Logout</MenuItem>
  </Menu>
);

const mobileMenuId = 'primary-search-account-menu-mobile';
const renderMobileMenu = (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <MenuItem>
      <IconButton size="large" aria-label="show 4 new mails" color="inherit">
        <Link to="rigster">
            <Button variant="contained" style={{backgroundColor:"rgb(13 202 240)"}}>Rigster</Button>
            </Link>
      </IconButton>
    </MenuItem>
    
    <MenuItem>
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
      >
        <Link to="login">
          <Button variant="contained"style={{backgroundColor:"rgb(13 202 240)"}}>LogIn</Button>
          </Link>
      </IconButton>
    </MenuItem>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
      >
        
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            
      </IconButton>
    </MenuItem>
  </Menu>
);
// ==============================

  return (
    <>
              {/* =============================================================================== */}
              <Box sx={{ flexGrow: 1,marginBottom:0 }}>
      <AppBar position="static">
        <Toolbar>
          {token ?
          <Link style={{textDecoration:"none",color:"white"}} to="/home">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' ,cursor:"pointer"} }}
          >
            Sociopedia
          </Typography>
          </Link>
          :
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' ,cursor:"pointer"} }}
          >
            Sociopedia
          </Typography>
          }
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Link  to="/rigster">
              <Button variant="contained" style={{backgroundColor:"rgb(13 202 240)"}}>Rigster</Button>
              </Link>
            </IconButton>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              
              {!user ?
              
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" >{loading ?<LoadingCircular/> :null }</Avatar>
              : 
              
              <Avatar alt="Remy Sharp" src={user.imgProfile} >{loading ?<LoadingCircular/> :null }</Avatar>
              }
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    </>
  )
}



export default Nav
