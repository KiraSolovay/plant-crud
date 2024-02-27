import { useEffect, useState } from "react";
import axios from "axios";
import {Button, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';


function Posts() {
    const [posts, setPosts] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({})
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    }

    const handleChange = (event) => {
        const { name, value}  = event.target;

        setUpdatedPost(prev => {
            return({
                ...prev,
                [name]: value
            })
        })
    }

    const saveUpdatedPost = () => {
        axios.put(`/update/${updatedPost._id}`, updatedPost)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

        handleClose();
        window.location.reload();
    }

    return(
        <div className="PostsPage">
            <h1>Posts Page</h1>
            <Button variant="outline-dark" className="BackButton" onClick={() => navigate(-1)}>BACK</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Your Post!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Control 
                                className="FormTitle" 
                                placeholder="title" 
                                name="title" 
                                value={updatedPost.title ? updatedPost.title : ""}
                                onChange={handleChange}/>
                                <Form.Control 
                                className="FormDescription" placeholder="description"
                                name="description"
                                value={updatedPost.description ? updatedPost.description : ""}
                                onChange={handleChange}/>
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={saveUpdatedPost}>Save Changes</Button>
                    </Modal.Footer>
            </Modal>
            {posts ? (
                <>
                 {posts.map(post => {
                    return(
                        <div className ="PostBox" key={post._id}>
                            <h4>{post.title}</h4>
                            <p>{post.description}</p>
                            <div className= "ButtonsBox">
                                <Button onClick={() => updatePost(post)}variant="outline-info" className="UpdateButton">UPDATE</Button>
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