# todo-cassandra
 A to-do list with NextJS and Apache Cassandra
 ## Instructions
 1. Clone the repository
```
git clone https://github.com/diogenesc/todo-cassandra.git
cd todo-cassandra
```
 2. Install dependencies
```
./dependencies.sh
```
 3. Start the containers
```
docker-compose up -d
```
 4. Wait a minute or two and initialize the keyspace
```
docker-compose exec cassandra-1 cqlsh -f cassandra.cql
```
 5. Access on browser
```
http://localhost:3000
```