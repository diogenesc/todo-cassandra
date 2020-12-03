import cassandraConn from '../../services/cassandraConnect'

async function create(req, res) {
    const query = 'INSERT INTO tasks (id, task, created_at) values (uuid(), ?, ?)';
    const params = [req.body.task, new Date()];

    await cassandraConn.execute(query, params, { prepare: true });

    res.statusCode = 201
    res.json({ message: "Task created" })
}

export default create;