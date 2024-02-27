import { Button, Form } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function CreatePost() {
    const navigate = useNavigate();
    const [post, setPost] = useState({
        title:"",
        description:"",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;

        setPost(prev => {
            return {
                ...prev, 
                [name]: value,
            }
        })
    }

    const handleClick = (event) => {
        event.preventDefault();

        axios.post("/create", post).then((res) => console.log(res.data)).catch((err) => console.log(err))

    }

    return(
        <div className="CreatePost">
            <h1>Create a Post</h1>
            <Form>
                <Form.Group>
                    <Form.Control
                      className="FormTitle" 
                      name="title" 
                      value={post.title} 
                      placeholder="Title" 
                      onChange={handleChange}/>
                    <Form.Control
                      className= "FormDescription" 
                      name="description" 
                      value={post.description} 
                      placeholder="Description" 
                      onChange={handleChange}/>
                </Form.Group>
                <Button className="CreateButton" variant="outline-success" onClick={handleClick}>CREATE POST</Button>
            </Form>
            <Button variant="outline-dark" className="BackButton" onClick={() => navigate(-1)}>BACK</Button>
        </div>
    )
}

export default CreatePost;