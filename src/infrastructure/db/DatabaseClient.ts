import knex from 'knex';
import Knex from 'knex';
import { PG_DB, PG_DEBUG, PG_HOST, PG_PASSWORD, PG_USER } from '@config/config';

class DatabaseClient {
  db: Knex;

  constructor() {
    this.db = knex({
      client: 'pg',
      connection: {
        host: PG_HOST,
        user: PG_USER,
        password: PG_PASSWORD,
        database: PG_DB,
      },
      debug: PG_DEBUG,
    });
  }
}

export default new DatabaseClient();
