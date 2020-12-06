DROP KEYSPACE IF EXISTS trabalho_final;

CREATE KEYSPACE trabalho_final WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 2};

CREATE TABLE trabalho_final.tasks(
    id uuid,
    task text,
    created_at timestamp,
    PRIMARY KEY (id)
);