import {useState,useEffect, useContext} from 'react';
import {Form,Button} from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import {Swal} from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddTask(){

	const navigate = useNavigate();

    const {user} = useContext(UserContext);

	const [name,setName] = useState("");
	const [description,setDescription] = useState("");

	function createTask(e){

		e.preventDefault();

		let token = localStorage.getItem('token');
		console.log(token);

		fetch('http://localhost:4000/tasks/tasks',{

			method: 'POST',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({

				name: name,
				description: description

			})
		})
		.then(res => res.json())
		.then(data => {

            if (data.error === "Failed to save the task") {

				Swal.fire({

					icon: "error",
					title: "Unsuccessful Task Creation",
					text: data.message

				})

			} else {

				Swal.fire({

					icon:"success",
					title: "Task Added"

				})

				navigate("/tasks");
			}

		})

        setName("")
        setDescription("")
	}

	return (

            (user.id)
            ?
            <>
                <h1 className="my-5 text-center">Add Task</h1>
                <Form onSubmit={e => createTask(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={e => {setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" required value={description} onChange={e => {setDescription(e.target.value)}}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
		    </>
            :
            <Navigate to="/tasks" />

	)


}