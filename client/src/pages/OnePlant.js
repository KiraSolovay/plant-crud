import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";

function OnePlant() {
    const [onePlant, setOnePlant] = useState({
        name: '',
        species: '',
        sunlight: '',
        water: '',
        bio: ''
    });
    const [updatedPlant, setUpdatedPlant] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    // SOME SORT OF ERROR HERE
    const { id } = useParams();

    useEffect(() =>  {
        axios.get(`/plants/${id}`)
            .then((res) => {
                setOnePlant(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const deletePlant = (id) => {
        axios.delete(`/delete/${id}`)
            .then((res) => {
                navigate("/plants")
            })
            .catch((err) => console.log(err));
    };

    const updatePlant = (plant) => {
        setUpdatedPlant(plant);
        setShowModal(true);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedPlant(prevPlant => ({
            ...prevPlant,
            [name]: value
        }));
    };

    const saveUpdatedPlant = () => {
        axios.put(`/update/${updatedPlant._id}`, updatedPlant)
            .then((res) => {
                setOnePlant((onePlant._id === updatedPlant._id ? updatedPlant : onePlant));
                handleClose();
            })
            .catch((err) => console.log(err));
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="OnePlantPage">
            <Nav/>
            <h1>{onePlant.name}</h1>
            <Button variant="outline-dark" className="BackButton" onClick={() => navigate(-1)}>BACK</Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Your Plant!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                className="FormName"
                                placeholder="name"
                                name="name"
                                value={updatedPlant.name || ""}
                                onChange={handleChange} />
                            <Form.Control
                                className="FormSpecies"
                                placeholder="species"
                                name="species"
                                value={updatedPlant.species || ""}
                                onChange={handleChange} />
                            <Form.Control
                                className="FormSunlight"
                                placeholder="sunlight"
                                name="sunlight"
                                value={updatedPlant.sunlight || ""}
                                onChange={handleChange} />
                            <Form.Control
                                className="FormWater"
                                placeholder="water"
                                name="water"
                                value={updatedPlant.water || ""}
                                onChange={handleChange} />
                            <Form.Control
                                className="FormBio"
                                placeholder="Plant Biography"
                                name="bio"
                                value={updatedPlant.bio || ""}
                                onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={saveUpdatedPlant}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            <div className="OnePlantBox" key={onePlant._id}>
                <p>{onePlant.species}</p>
                <p>{onePlant.sunlight}</p>
                <p>{onePlant.water}</p>
                <p>{onePlant.bio}</p>
                <div className="ButtonsBox">
                    <Button onClick={() => updatePlant(onePlant)} variant="outline-info" className="UpdateButton">UPDATE</Button>
                    <Button onClick={() => deletePlant(onePlant._id)} variant="outline-danger" className="DeleteButton">DELETE</Button>
                </div>
            </div>
        </div>
    );
}

export default OnePlant;