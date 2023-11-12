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
    return rows[0];
}

export async function getLastQuestionId() {
  const [rows] = await pool.query("SELECT MAX(question_id) as maxQuestionId FROM questions");
  const lastQuestionId = rows[0].maxQuestionId;
  return lastQuestionId;
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
    return rows;
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

export async function addQuestionWithAnswers(question_text, answers) {
  try {
    const questionResult = await pool.query(
      `INSERT INTO questions (question_text) VALUES (?)`,
      [question_text]
    );

    const question_id = questionResult[0].insertId;

    const answerValues = answers.map(([ answer_text, is_correct ]) => [question_id, answer_text, is_correct]); // ([]) - directly destructure from array

    const answerResult = await pool.query(
      `INSERT INTO answers (question_id, answer_text, is_correct) VALUES ?`,
      [answerValues]
    );

    return { question_id, question_text, answers: answerResult.affectedRows };
  } catch (error) {
    throw error;
  }
}

// const notes = await getLastQuestionId();
// console.log(notes);
