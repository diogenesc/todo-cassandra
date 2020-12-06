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
    const [isLoading, setIsLoading] = useState(false);

    function handleInput(event) {
        setTaskInput(event.target.value);
    }

    async function refresh() {
        setTasks(await fetcher('http://localhost:3000/api/list'));
    }

    async function handleInsert() {
        event.preventDefault();

        if(taskInput === "") {
            alert("Invalid input");
            return;
        }

        setIsLoading(true);

        await axios.post('/api/create', {
                task: taskInput
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        setIsLoading(false);
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

    async function handleDeleteAll(event) {
        event.preventDefault();

        await axios.post('/api/destroyAll', {})
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
                <Row className="py-4">
                    <Col className="text-center">
                        <h1>To-Do List</h1>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-right">
                        <Button onClick={() => {refresh(); alert("All good!")}} variant="success" type="submit">
                            Refresh
                        </Button>
                        <Button className="ml-2" onClick={handleDeleteAll} variant="warning" type="submit">
                            Delete all
                        </Button>
                    </Col>
                </Row>
                
                <Row className="pb-5">
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
                <Row className="mb-3">
                    <Col>
                        <Form onSubmit={handleInsert}>
                            <Form.Group>
                                <Form.Label>Insert a task</Form.Label>
                                <Form.Control type="text"
                                    onChange={() => setTaskInput(event.target.value)} 
                                    value={taskInput}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                { isLoading ? 'Loading' : 'Insert'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
