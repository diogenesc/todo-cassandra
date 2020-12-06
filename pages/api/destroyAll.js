import cassandraConn from '../../services/cassandraConnect'

async function create(req, res) {
    const query = 'TRUNCATE tasks';

    await cassandraConn.execute(query);

    res.statusCode = 200
    res.json({ message: "Task removed" })
}

export default create;