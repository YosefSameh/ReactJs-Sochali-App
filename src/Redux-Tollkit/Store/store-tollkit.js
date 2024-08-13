import { configureStore } from "@reduxjs/toolkit";
import SliceRigster from "../rigster-tollkit";
import SliceLogin from "../login-tollkit";
import SlicePosts from "../posts.tollkit";
import SliceAddPost from "../add-post-tollkit";
import SliceUsers from "../users-tollkit";
import SliceComment from "../comment-tollkit";
import SliceSave from "../save-tollkit";
import SliceFollow from "../follow-tollkit";
import SliceUpload from "../upload-tollkit";

const store = configureStore({
    reducer: {
        user:SliceRigster,
        login:SliceLogin,
        posts:SlicePosts,
        users:SliceUsers,
        post:SliceAddPost,
        comment:SliceComment,
        save:SliceSave,
        follow:SliceFollow,
        upload:SliceUpload
    }  
})

export default store