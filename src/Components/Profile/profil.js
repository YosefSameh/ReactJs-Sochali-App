import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';
import FrindesFollowing from '../Frindes/frindes';
import Posts from '../Posts/posts';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../Redux-Tollkit/users-tollkit';
import LoadingCircular from '../loading/loading-Circular';



export default function ProfilePage() {
 const token = localStorage.getItem("token")
 const idUser = localStorage.getItem("id")
 const {users,error,loading} = useSelector(state => state.users)
 const {userId} = useParams()
 const dispatch = useDispatch()
 const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    useEffect(() => {
      dispatch(fetchUsers(config));
    }, [dispatch]);


    let  URL = ""
    let  user = ""
    if(!userId){
      user = users.find(user => user._id === idUser);
      
      URL = `https://node-js-sochali-app.vercel.app/api/profile`
    }else{
      URL = `https://node-js-sochali-app.vercel.app/api/profile/${userId}`
      // dispatch(fetchUsers(config))
      user = users.find(user => user._id === userId);
  
  
}
if(!user){
  return <div><LoadingCircular/></div>
}
if(!users){
  return <div><LoadingCircular/></div>
}
if(error){
  return <div>{error}</div>
}



  
    
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={user.imgProfile}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px',height:"150px" }}
                  fluid />
                <p className="text-muted mb-1 mt-1">Front End Developer</p>
                <div className="d-flex justify-content-center mb-2">
                </div>
              </MDBCardBody>
            </MDBCard>
          {/* frindes following */}
            <div>
                <FrindesFollowing/>
            </div>
          </MDBCol>
          
          
         <MDBCol lg="7">
         <div className='d-flex flex-column'>
            <MDBCard >
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    
                     <MDBCardText className="text-muted">{user.firstName} {user.lastName}</MDBCardText>
                    
                    {/* <MDBCardText className="text-muted">{user.firstName} {user.lastName}</MDBCardText>
                      */}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  
                     <MDBCardText className="text-muted">{user.email}</MDBCardText>
                     
                     
                     
                     {/* <MDBCardText className="text-muted">{user.email}</MDBCardText> */}
                     
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
            </MDBRow>
          {/* ==========posts */}
          {/*  */}
          

          <Posts url={URL} token={config}/>
          </div>
          </MDBCol>
          {/* ==========posts */}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}