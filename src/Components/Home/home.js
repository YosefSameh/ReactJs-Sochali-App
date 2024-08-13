
import AddPost from "../AddPosts/addPost"
import Posts from "../Posts/posts"
import SectionLeft from "../SectionLeft/sectionLeft"
import "./home.css"

const Home = ()=> {
    return(
        
            <div className='container mt-4' >
                <div  className="response">
                    <SectionLeft/>
                    <div  className='d-flex flex-column  response2'>
                        <AddPost/>
                        <Posts flex="start"/>    
                    </div>
                </div>
            </div>
        
    )
}


export default Home
