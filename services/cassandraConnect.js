import { Client } from 'cassandra-driver';

const client = new Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  keyspace: 'trabalho_final'
});

export default client;