import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise() //instead of callback

export async function getQuestions(){
    const [rows] = await pool.query("SELECT * FROM questions")
    return rows;
}

export async function getQuestion(id) {
    const [rows] = await pool.query(`SELECT *
    FROM questions
    WHERE question_id = ?
    `, [id]) //send id to db separately without untrusted value
    return rows[0]; //always returns first object out of array
}

export async function createQuestion(title, contents) {
    const [result] = await pool.query(`
    INSERT INTO questions (title, contents)
    VALUES (?, ?)
    `, [title, contents])
    return result
}

export async function getAnswers(){
    const [rows] = await pool.query("SELECT * FROM answers")
    return rows;
}

export async function getAnswer(id) {
    const [rows] = await pool.query(`SELECT *
    FROM answers
    WHERE question_id = ?
    `, [id]) //send id to db separately without untrusted value
    return rows; //always returns first object out of array
}

export async function postScoreboard(username, score) {
    const [result] = await pool.query(`
        INSERT INTO scoreboard (username, score)
        VALUES (?, ?)
    `, [username, score]);
    return result;
}

export async function getScoreboard(){
    const [rows] = await pool.query("SELECT * FROM scoreboard")
    return rows;
}

const notes = await getAnswer(1)
console.log(notes);