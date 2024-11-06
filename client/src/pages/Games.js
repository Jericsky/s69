import { useEffect, useState, useContext } from 'react';
import GameCard from '../components/GameCard';
import UserContext from '../UserContext';
import { Row, Col } from 'react-bootstrap';

export default function Games() {

	const { user } = useContext(UserContext); 
	const [games, setGames] = useState([]);


	const fetchData = () => {


		fetch('http://localhost:4000/games/all', {
			headers: {
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		})
		.then(res => res.json())
		.then(data => {

		    if (typeof data.message !== "string") {
		    	setGames(data.tasks);
		    } else {
		    	setGames([]);
		    }

		});
	}

    useEffect(() => {

		fetchData()

    }, []);


	return(
		<>
            {
            	user
                ?
                        tasks.length > 0

                        ?
                        <>  
                        <h1 className='text-center mt-5'>Tasks</h1>
                        <Row> 
                            
                                {   

                                    tasks.map(task => { 

                                        return (
                                            <Col md={3}>
                                                <GameCard task={task} />
                                            </Col>
                                        )
                                        
                                    })
                                }   

                        </Row>

                        </>
                        :
                        <>
                            <h1>No Games</h1>
                        </>
                :
                <>
                    <h1>You are not logged in</h1>
                    <Link className="btn btn-primary" to={"/login"}>Login to View</Link>
                </>

        	}
        </>
	)
}











