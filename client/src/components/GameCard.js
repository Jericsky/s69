import { Card, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function GameCard({game}) {

	const { _id, name, description, status} = game;
    const navigate = useNavigate();

    function updateGameStatus(id) {

            fetch(`http://localhost:4000/games/${id}`,{

            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if (data.error === "Error in Saving") {

                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Game Update",
                    text: data.message

                })

            } else {

                Swal.fire({

                    icon:"success",
                    title: "Game Updated"

                })

                window.location.reload() 
            }

        })
    }

    function deleteGame(id) {

            fetch(`http://localhost:4000/games/${id}`,{

            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {

            if (data.error === "Error in Saving") {

                Swal.fire({

                    icon: "error",
                    title: "Unsuccessful Game Deletion",
                    text: data.message

                })

            } else {

                Swal.fire({

                    icon:"success",
                    title: "Game Deleted"

                })

                window.location.reload() 
            }

        })
    }

	return (
		<Card className="mt-3">
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text>{status}</Card.Text>		        
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
                <button className="btn btn-primary btn-sm" onClick={() => updateGameStatus(_id)}>Update</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteGame(_id)}>Delete</button>
            </Card.Footer>
        </Card>
		)
}
