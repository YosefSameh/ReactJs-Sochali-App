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



export default function ProfilePage() {
 const token = localStorage.getItem("token")
 const firstName = localStorage.getItem("firstName")
 const lastName = localStorage.getItem("lastName")
 const {users} = useSelector(state => state.users)
 const {userId} = useParams()
 const dispatch = useDispatch()
 const config = {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};
let  URL = ""
if(!userId){

  URL = `https://node-js-sochali-app.vercel.app/api/profile`
}else{
  URL = `https://node-js-sochali-app.vercel.app/api/profile/${userId}`

  dispatch(fetchUsers(config))
  
}

const user = users.find(user => user._id === userId);
  
    
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1 mt-1">Front End Developer</p>
                <div className="d-flex justify-content-center mb-2">
                {/* <Button className='bg-info' variant="contained">Follow</Button> */}
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
                    {user ? 
                     <MDBCardText className="text-muted">{user.firstName} {user.lastName}</MDBCardText>
                     :
                    <MDBCardText className="text-muted">{firstName} {lastName}</MDBCardText>
                     }
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  {user ? 
                     <MDBCardText className="text-muted">{user.email}</MDBCardText>
                     
                     :
                     
                     <MDBCardText className="text-muted">{firstName}{lastName}@gmail</MDBCardText>
                     }
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Nasr City</MDBCardText>
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