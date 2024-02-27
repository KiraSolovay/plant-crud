import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CreatePlant() {
    const navigate = useNavigate();
    const [plant, setPlant] = useState({
        name: "",
        species: "",
        sunlight: "",
        water: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPlant(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleClick = (event) => {
        event.preventDefault();

        axios.post("/create", plant)
            .then((res) => {
                console.log(res.data);
                navigate("/plants"); 
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="CreatePlant">
            <h1>Create a Plant</h1>
            <Form>
                <Form.Group>
                    <Form.Control
                        className="FormName"
                        name="name" 
                        value={plant.name}
                        placeholder="name"
                        onChange={handleChange} />
                    <Form.Control
                        className="FormSpecies"
                        name="species"
                        value={plant.species}
                        placeholder="species"
                        onChange={handleChange} />
                    <Form.Control
                        className="FormSunlight"
                        name="sunlight" 
                        value={plant.sunlight}
                        placeholder="sunlight amount"
                        onChange={handleChange} />
                    <Form.Control
                        className="FormWater"
                        name="water"
                        value={plant.water}
                        placeholder="water date"
                        onChange={handleChange} />
                </Form.Group>
                <Button className="CreateButton" variant="outline-success" onClick={handleClick}>CREATE PLANT</Button>
            </Form>
            <Button variant="outline-dark" className="BackButton" onClick={() => navigate("/plants")}>BACK</Button>
        </div>
    )
}

export default CreatePlant;