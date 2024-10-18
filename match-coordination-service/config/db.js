import nano from 'nano';
import dotenv from 'dotenv';

dotenv.config();

const couch = nano(process.env.DB);
const db = couch.db.use('platform_matches');

export default db;