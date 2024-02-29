import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav"

function Plants() {
    const [plants, setPlants] = useState([]);
    const [updatedPlant, setUpdatedPlant] = useState({});
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();


    // on start fetch all the plants!
    useEffect(() => {
        axios.get("/plants")
            .then((res) => {
                setPlants(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deletePlant = (id) => {
        axios.delete(`/delete/${id}`)
            .then((res) => {
                setPlants(plants.filter(plant => plant._id !== id));
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
                setPlants(plants.map(plant => (plant._id === updatedPlant._id ? updatedPlant : plant)));
                handleClose();
            })
            .catch((err) => console.log(err));
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className="PlantsPage">
            <Nav/>
            <h1>Plants Page</h1>
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
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={saveUpdatedPlant}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            {plants.map(plant => (
                <div className="PlantBox" key={plant._id}>
                    <h4>{plant.name}</h4>
                    <Button className="MoreDetailsButton" variant="outline-success" onClick={() => navigate(`/plants/${plant._id}`)}>More Details</Button>
                    <p>{plant.species}</p>
                    <p>{plant.sunlight}</p>
                    <p>{plant.water}</p>
                    <div className="ButtonsBox">
                        <Button onClick={() => updatePlant(plant)} variant="outline-info" className="UpdateButton">UPDATE</Button>
                        <Button onClick={() => deletePlant(plant._id)} variant="outline-danger" className="DeleteButton">DELETE</Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Plants;
