import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://neondb_owner:npg_cW2QjlwzHqA8@ep-shy-grass-a1fhqbkl-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require');
export const db = drizzle(sql,{schema});