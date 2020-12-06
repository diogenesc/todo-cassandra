import cassandraConn from '../../services/cassandraConnect'

function compare(a, b) {
  if (a.created_at < b.created_at){
    return -1;
  }
  if (a.created_at > b.created_at){
    return 1;
  }
  return 0;
}
  

async function list(req, res) {
    let tasks = [];

    const query = "SELECT * FROM tasks";

    await cassandraConn.execute(query)
        .then(result => tasks = result.rows);

    tasks.sort(compare);

    console.log(tasks);
    res.statusCode = 200
    res.json(tasks)
}

export default list;