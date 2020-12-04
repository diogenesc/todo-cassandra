# todo-cassandra
 A to-do list with NextJS and Apache Cassandra
 ## Instructions
 1. Clone the repository
```
git clone https://github.com/diogenesc/todo-cassandra.git
cd todo-cassandra
```
 2. Start the containers
```
docker-compose up -d
```
 3. Initialize the keyspace
```
docker-compose exec cassandra-1 bash
cqlsh -f cassandra.cql
```
 4. Access on browser
```
http://localhost:3000
```