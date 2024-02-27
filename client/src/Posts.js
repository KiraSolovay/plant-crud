import { useEffect, useState } from "react";
import axios from "axios";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Posts() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/posts")
        .then((res) => {
            console.log(res);
            setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }, [])

    const deletePost = (id) => {
        axios.delete(`/delete/${id}`)
        .then((res)=> console.log(res))
        .catch((err)=> console.log(err))

        window.location.reload();
    }

    return(
        <div className="PostsPage">
            <h1>Posts Page</h1>
            <Button variant="outline-dark" className="BackButton" onClick={() => navigate(-1)}>BACK</Button>
            {posts ? (
                <>
                 {posts.map(post => {
                    return(
                        <div className ="PostBox" key={post._id}>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div className= "ButtonsBox">
                                <Button variant="outline-info" className="UpdateButton">UPDATE</Button>
                                <Button onClick={()=>deletePost(post._id)}variant="outline-danger" className="DeleteButton">DELETE</Button>
                            </div>
                        </div>
                    );
                 })}
                </>
             ) : (
                ""
            )}
        </div>
    )
}

export default Posts;