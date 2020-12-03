DROP KEYSPACE trabalho_final;

CREATE KEYSPACE IF NOT EXISTS trabalho_final WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

CREATE TABLE trabalho_final.tasks(
    id uuid,
    task text,
    created_at timestamp,
    PRIMARY KEY (id)
);