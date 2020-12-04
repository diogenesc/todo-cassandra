import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['cassandra-1'],
  localDataCenter: 'datacenter1',
  keyspace: 'trabalho_final'
});

export default client;