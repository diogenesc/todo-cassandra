import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Col, Container, Row, Button, Form, Dropdown } from 'react-bootstrap'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

export async function getServerSideProps(context) {
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

    async function refresh() {
        setTasks(await fetcher('/api/list'));
        console.log(tasks);
    }

    async function handleSubmit() {
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

    async function handleDelete(id) {
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
                        <Link href="/"><a><h1>To-Do List</h1></a></Link>
                    </Col>
                </Row>

                <Row>
                    <Col className="text-right">
                        <Button onClick={refresh} variant="success" type="submit">
                            Refresh
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
                                        onClick={() => handleDelete(task.id)} 
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
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="task">Insert a task</Form.Label>
                                <Form.Control type="text"
                                    onChange={() => setTaskInput(event.target.value)} 
                                    value={taskInput}
                                    id="task"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={isLoading}>
                                { isLoading ? 'Loading' : 'Create'}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
