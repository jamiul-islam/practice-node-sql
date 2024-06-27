import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create the connection to database
const pool = await mysql
  .createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  })
  .catch((err) => {
    console.log("🚨 ERROR:", err.message);
  });

// get all the books
async function getBooks() {
  const [results] = await pool.query("SELECT * FROM Books").catch((err) => {
    console.log("🚨 ERROR: " + err?.sqlMessage);
    console.log("🚨 for sql command: " + err?.sql);
  });
  return results;
}

// get book by name
async function getABook(bookName) {
  const [results] = await pool
    .query("SELECT * FROM Books WHERE name like ?", [bookName])
    .catch((err) => {
      console.log("🚨 ERROR: " + err?.sqlMessage);
      console.log("🚨 for sql command: " + err?.sql);
    });

  return results;
}

// get single book by id
async function getBookById(id) {
  const [results] = await pool
    .query("SELECT * FROM Books WHERE id = ?", [id])
    .catch((err) => {
      console.log("🚨 ERROR: " + err?.sqlMessage);
      console.log("🚨 for sql command: " + err?.sql);
    });

  return results;
}

// create a book
async function createBook(name, price) {
  const [results] = await pool
    .query("INSERT INTO Books (name, price) VALUES (?, ?)", [name, price])
    .catch((err) => {
      console.log("🚨 ERROR: " + err?.sqlMessage);
      console.log("🚨 for sql command: " + err?.sql);
    });
  return results;
}

export { getBooks, getABook, getBookById, createBook };
