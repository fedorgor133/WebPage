import 'dotenv/config';
import pg from 'pg';
import * as schema from './schema';

import { drizzle } from 'drizzle-orm/node-postgres';
const connection = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle({ client: connection, schema, logger: false });

export default db;
