import Head from 'next/head'
import { useState } from 'react'
import { Col, Container, Row, Button, Form, Dropdown } from 'react-bootstrap'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export async function getServerSideProps(context) {
    console.log(process.env.APP_URL);
    const tasks = await fetcher('http://localhost:3000/api/list');

    return {
        props: {
            tasks
        },
    }
}

export default function Home(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [taskInput, setTaskInput] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    function handleInput(event) {
        setTaskInput(event.target.value);
    }

    async function refresh() {
        setTasks(await fetcher('http://localhost:3000/api/list'));
    }

    async function handleInsert(event) {
        event.preventDefault();

        setIsCreating(true);

        await axios.post('/api/create', {
                task: taskInput
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        setIsCreating(false);
        setTaskInput("");

        refresh();
    }

    async function handleDelete(event, id) {
        event.preventDefault();

        await axios.post('/api/destroy', {
            id: id
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        
        refresh();
    }

    return (
        <div>
            <Head>
            <title>To-Do with Cassandra</title>
            <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>To-Do List</h1>
                    </Col>
                </Row>
                
                <Row className="py-5">
                    <Col>
                        <Dropdown.Divider></Dropdown.Divider>
                        {tasks.map((task) => (
                            <div key={task.id}>
                                <Row>   
                                    <Col className="d-flex align-items-center justify-content-between">
                                        {task.task}
                                        <Button 
                                        onClick={() => handleDelete(event, task.id)} 
                                        variant="danger">
                                            Delete
                                        </Button>
                                    </Col>
                                    
                                </Row>
                                <Dropdown.Divider></Dropdown.Divider>
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>Insert a task</Form.Label>
                                <Form.Control type="text" placeholder="Enter text" onChange={handleInput} value={taskInput} required={true} />
                            </Form.Group>
                            <Button onClick={handleInsert} variant="primary" type="submit" disabled={isCreating}>
                                { isCreating ? 'Loading' : 'Insert'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
