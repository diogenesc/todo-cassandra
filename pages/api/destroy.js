import cassandraConn from '../../services/cassandraConnect'

async function create(req, res) {
    const query = 'DELETE FROM tasks WHERE id = ?';

    const params = [req.body.id];

    await cassandraConn.execute(query, params, { prepare: true });

    res.statusCode = 200
    res.json({ message: "Task removed" })
}

export default create;