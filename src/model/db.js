import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectString = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
};

const pool = new pg.Pool(connectString);

pool.on("connect", () => {});

const createTable = async () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
    todos(id SERIAL PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        created_at DATE NOT NULL,
        completed BOOLEAN NOT NULL)`;
  try {
    await pool.query(queryText);
    console.log("Table created");
  } catch (e) {
    // pool.end();
    console.log(e);
  }
};

const dropTable = async () => {
  try {
    const query = "DROP TABLE IF EXISTS todos";
    await pool.query(query);
    console.log("Table dropped");
  } catch (e) {
    pool.end();
  }
};

createTable();
// dropTable();
export default pool;
